import './index.sass'
import {Avatar, Tag} from "antd";
import SocialButton from "../../../components/Buttons/SocialButton";
import {useEffect,  useState} from "react";
import {useSelector} from "react-redux";
import UserState from "../../../interface/UserState";
import { motion } from 'framer-motion';
import {formatNote, NoteType} from "../../../interface/NoteType";
import {categoryList} from "../../../store/components/categories.tsx";
import Article from "./Article.tsx";
import {useNavigate} from "react-router-dom";
import {SocialType} from "../../../interface/SocialType";
import {getNotePage, getTopNotes} from "../../../apis/NoteMethods.tsx";
const ContentHome = () => {
    const [currentTop,setCurrentTop] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [hasMoreArticles, setHasMoreArticles] = useState(true);
    const [loading, setLoading] = useState(false);
    const avatar = useSelector((state:{user:UserState}) => state.user.avatar)
    const name = useSelector((state:{user:UserState}) => state.user.name)
    const oneSay = useSelector((state:{user:UserState}) => state.user.talk)
    const navigate = useNavigate()
    const [otherArticles,setOtherArticles] = useState<NoteType[]>([])
    const [topArticles,setTopArticles] = useState<NoteType[]>([])
    const Categories = useSelector((state: { categories: categoryList }) => state.categories.categories);
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)
    const social = useSelector((state:{user:{social: SocialType}}) => state.user.social)
    const author =  useSelector((state: { user: UserState }) => state.user.name);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTop(prevTop => (prevTop + 1) % topArticles.length);
        }, 3000);
        if(topArticles.length === 0)
            clearInterval(timer)
        return () => clearInterval(timer);
    },[currentTop])

    useEffect(() => {
        getNotePage({
            page: 1,
            pageSize: 6
        }).then(res => {
            setOtherArticles(res.data.data.map((item: formatNote) => {
                return {
                    ...item,
                    key: item.noteKey,
                    noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                }
            }))
        })
    }, []);

    useEffect(() => {
        getTopNotes().then(res => {
            setTopArticles(res.data.data.map((item: formatNote) => {
                return {
                    ...item,
                    key: item.noteKey,
                    noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                }
            }))
        })
    }, []);
    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    const getMore = () => {
        setLoading(true)
        getNotePage({
            page: currentPage + 1,
            pageSize: 6
        }).then(res => {
            if (res.data.data.length === 0) {
                setHasMoreArticles(false);
            } else {
                setCurrentPage(currentPage + 1);
                setOtherArticles(prevArticles => [
                    ...prevArticles,
                    ...res.data.data.map((item: formatNote) => ({
                        ...item,
                        key: item.noteKey,
                        noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                    }))
                ]);
                if(res.data.data.length < 6)
                    setHasMoreArticles(false)
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return <>
        <div className="SelfDescription">
            <div className="SayWords">
               <div>
                   <h2>Hi!👋</h2>
                   <h2>I'm <span style={{color: '#7880d1'}}>{author}</span></h2>
               </div>
                <h3>A Web Developer</h3>
                <div className="Social">
                    <SocialButton SocialName='QQ' url={social?.socialQQ}/>
                    <SocialButton SocialName='Github' url={social?.socialGithub}/>
                    <SocialButton SocialName='Netease' url={social?.socialNeteaseCloud}/>
                    <SocialButton SocialName='Email' url={social?.socialEmail}/>
                </div>
            </div>
            <Avatar src={avatar} size={320} className='frontAvatar'/>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{display:'flex',width:'200px',justifyContent:'center',bottom:'0',position:"absolute"}}
            >
            <p style={{position:'absolute',bottom:"100px", font: '600 12px ""'}}>{oneSay}</p>
                <i className="iconfont icon-rcd-angle-double-down upAndDown" style={{fontSize: 50,position:"absolute",bottom: 20,color:'skyblue'}} onClick={handleScrollDown}/></motion.div>
        </div>
        <div className="ContentContainer dark-pic">
            {topArticles.length>0&&<div className="TopArticle" onClick={() => navigate(`/article/${topArticles[currentTop]?.key}`)}>
                <div className="Top"><i className="iconfont icon-sticky1" style={{fontSize: 20,verticalAlign:'middle',marginRight:5}}></i>置顶</div>
                <div className="TopCover">
                    {topArticles.map((item,index) => (
                        <img
                            src={item.cover}
                            key={item.key}
                            className={currentTop === index ? 'fade-in-out show' : 'fade-in-out'}
                        />
                    ))}

                    <span className="thumbnail-screen"></span>
                    <div className="topDots">
                        {topArticles.map((item,index) => <div className={`topDot ${currentTop===index&&'dotCurrent'}`} key={item.key} onMouseEnter={()=>setCurrentTop(index)}></div>)}
                    </div>
                </div>
                <div className="topContent">
                    <h4># {Categories.find(item => item.categoryKey === topArticles[currentTop]?.noteCategory)?.categoryTitle}</h4>
                    <h3 className="contentTitle">{topArticles[currentTop]?.noteTitle}</h3>
                    <p> {topArticles[currentTop]?.description}</p>
                    <div className='tags' style={{ width: '100%', marginTop: '10px' }}>
                        {topArticles[currentTop]?.noteTags.map(noteTag => {
                            let color;
                            let name;
                            tagList.forEach((tag: { tagKey: number; color: string; title: string; children: any[]; }) => {
                                if (tag.tagKey === noteTag) {
                                    color = tag.color;
                                    name = tag.title;
                                } else if (tag.children && tag.children.some(child => child.tagKey === noteTag)) {
                                    color = tag.color;
                                    name = tag.children.find(child => child.tagKey === noteTag).title;
                                }
                            });

                            return (
                                <Tag color={color} key={noteTag} style={{ margin: 5 }}>
                                    {name}
                                </Tag>
                            );
                        })}
                    </div>
                    <div className="topFooter">
                        <Avatar src={avatar} size={40} style={{marginRight:10}}/>
                        <span style={{marginRight:10}}>{name}</span>
                        <span style={{fontSize:13,color:'#7f7e7e'}} className='post-date'><i className="iconfont icon-naozhong icon" style={{fontSize: 22, display: 'inline',verticalAlign: 'sub'}}></i>发布于 2024.03.02</span>
                    </div>
                </div>
            </div>}


        {/*  其他文章  */}
            <div style={{width:'78%'}}>
                <div className='allContent'><i className="iconfont icon-wenzhang2" style={{fontSize: 25,verticalAlign:'sub',marginRight:5,color:'#7f7e7e'}}></i>文章</div>
            </div>

            <div className="allArticles">

                {otherArticles.map((item,index) => (
                    <Article item={item} index={index} Categories={Categories} avatar={avatar} name={name} tagList={tagList} key={index}/>
                ))}
            </div>
            {loading ? (
                <div className="loadingio-spinner-spinner-69tfms83mg9">
                    <div className="ldio-se504dvlmh">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            ) : (
                <div>
                    {hasMoreArticles ? (
                        <div className='allContent more' style={{ padding: '20px 50px 20px 50px', borderRadius: 20, fontSize: 20 }} onClick={getMore}>More</div>
                    ) : null}
                </div>
            )}
        </div>
    </>
}

export default ContentHome