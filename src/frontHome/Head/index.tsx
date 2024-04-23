import {Avatar, Button, Card, ConfigProvider, Modal} from 'antd'
import './index.sass'
import {Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {debounce} from 'lodash';
import Switch from "../../components/Switch";
import SearchButton2 from "../../components/Buttons/SearchButton2";
import TopMao from "../../components/TopMao";
import {fetchCategories} from "../../store/components/categories.tsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "../../store/components/tags.tsx";
import {fetchSocial, fetchUserInfo} from "../../store/components/user.tsx";
import {fetchNoteList} from "../../store/components/note.tsx";
import UserState from "../../interface/UserState";
import '../main.css'
import MoonToSun from "../MoonToSun";
interface HeadProps {
    setDark: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    isDark: boolean,
    scrollHeight: number
}

const Head = ({ setDark, isDark, scrollHeight }: HeadProps) => {
    const [showStatus, setShowStatus] = useState(false);
    const [phoneBarShow, setPhoneBarShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLogin, setLogin] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [animation,setAnimation] = useState('');
    const categoryList = useSelector((state: any) => state.categories.categories)
    const avatar = useSelector((state:{user:UserState}) => state.user.avatar)
    const blogTitle = useSelector((state:{user:{blogTitle: string}}) => state.user.blogTitle)

    useEffect(() => {
        dispatch<any>(fetchCategories())
        dispatch<any>(fetchTags())
        dispatch<any>(fetchUserInfo())
        dispatch<any>(fetchNoteList())
        dispatch<any>(fetchSocial())
        const status = localStorage.getItem('tokenKey')
        if (status !== null) {
            setLogin(1)
        }

    }, []);

    // 定义防抖函数，设置延迟时间为 300 毫秒
    const startAnimationDebounced = debounce(() => {
        setShowStatus(true);
    }, 300);

    const handleMouseEnter = () => {
        startAnimationDebounced();
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setShowStatus(false);
        setIsHovered(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleModeSwitch = () => {
        setDark(!isDark)
        setAnimation(isDark === true ? "sun" : "moon");
        localStorage.setItem("isDarkMode", JSON.stringify(!isDark));
    };

    return (
        <header style={{display: 'flex', flexDirection: 'row', position: 'sticky', width: '100%', top: 0, zIndex: '999'}} className={isDark ? 'frontDark' : ''}>
            <div className={`${phoneBarShow ? 'openBar' : ''} phoneSide`} style={{position: "sticky"}}>
                <div className="phoneBarContainer">
                    <div className="barLogo">
                        <Avatar
                            src={avatar}
                            size={100}/>
                    </div>
                    <input className="mSearchInput" type="search" placeholder="搜索..."/>
                    <div className="barContent">
                        <ul className='oneBar'>
                            <li onClick={() => navigate('')}><i className="iconfont icon-shouye4"
                                                                style={{fontSize: 30}}></i>首页
                            </li>
                            <li onClick={() => navigate('times')}><i className="iconfont icon-guidang3"
                                                                     style={{fontSize: 25}}></i>归档
                            </li>
                            <li>
                                <div style={{height: 30}}><i className="iconfont icon-fenlei"
                                         style={{fontSize: 30}}></i>分类</div>
                            </li>
                            <ul className='twoBar'>
                                {categoryList.map((item: { categoryKey: Key | null | undefined; pathName: any; icon: any; categoryTitle: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; }) =>
                                    <li key={item.categoryKey} onClick={() => navigate(`category/${item.pathName}`)} style={{fontSize: 15}}><i className={`iconfont ${item.icon}`} style={{verticalAlign: 'middle'}}></i>{item.categoryTitle}</li>
                                )}
                            </ul>
                            <li onClick={() => navigate('talk')}><i className="iconfont icon-riji"
                                                                    style={{fontSize: 30}}></i>说说
                            </li>
                            <li onClick={() => navigate('friends')}><i className="iconfont icon-lianjie"
                                                                       style={{fontSize: 30}}></i>友人链
                            </li>
                            <li onClick={() => navigate('about')}><i className="iconfont icon-leaf-01"
                                                                     style={{fontSize: 30}}></i>关于我
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <TopMao currentScrollHeight={scrollHeight}/>
            <div className="headContainer" style={{
                margin: scrollHeight ? 0 : '',
                borderRadius: scrollHeight ? 0 : '',
                background: scrollHeight ? 'rgba(0,0,0,0.66)' : '',
                width: scrollHeight ? '100%' : '',
                backdropFilter: scrollHeight ? 'blur(10px)' : ''
            }}>
                <div className="phoneBar">
                    {phoneBarShow ? <i className="iconfont icon-guanbi2" style={{
                            fontSize: 35,
                            marginLeft: 260,
                            cursor: 'pointer',
                            transition: '0.5s'
                        }} onClick={() => setPhoneBarShow(false)}></i> :
                        <i className="iconfont icon-bars"
                           style={{fontSize: 35, marginLeft: 10, cursor: 'pointer', transition: '0.5s'}}
                           onClick={() => setPhoneBarShow(true)}></i>}
                </div>
                <div className="webTitle" onClick={()=>navigate('/')}>
                    <h2><span className="firstTitle">{blogTitle}</span>Blog</h2>
                </div>
                <div className="headBar">
                    <ul>
                        <li onClick={() => navigate('/')}><i className="iconfont icon-shouye4"
                                                             style={{fontSize: 30}}></i>首页
                        </li>
                        <li onClick={() => navigate('times')}><i className="iconfont icon-guidang3"
                                                                 style={{fontSize: 25}}></i>归档
                        </li>
                        <li style={{position: 'relative'}} className='Category'><i
                            className="iconfont icon-fenlei" style={{fontSize: 30}}></i>分类
                            <div className='CategoryList'>
                                <i className="iconfont icon-Rrl_s_045" style={{
                                    fontSize: 40,
                                    position: 'absolute',
                                    left: 25,
                                    top: -29,
                                    color: 'rgba(0, 0, 0, 0.83)'
                                }}></i>
                                <ul>
                                    {categoryList.map((item: { categoryKey: Key | null | undefined; pathName: any; icon: any; categoryTitle: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined; }) =>
                                        <li key={item.categoryKey} onClick={() => navigate(`category/${item.pathName}`)}><i className={`iconfont ${item.icon}`} style={{fontSize: 20}}></i>{item.categoryTitle}</li>
                                    )}
                                </ul>
                            </div>
                        </li>
                        <li onClick={()=>navigate('talk')}><i className="iconfont icon-liaotian1" style={{fontSize: 30}}></i>说说</li>
                        <li onClick={()=>navigate('friends')}><i className="iconfont icon-lianjie" style={{fontSize: 30}}></i>友人链</li>
                        <li onClick={()=>navigate('about')}><i className="iconfont icon-leaf-01" style={{fontSize: 30}}></i>关于我</li>
                    </ul>
                </div>

                <div className="homeRight">
                    <div onClick={showModal}><SearchButton2 /></div>
                    <div className={'homeSwitch'}><Switch handleModeSwitch={handleModeSwitch} isDarkMode={isDark}/></div>
                    <div className={`homeLogo ${isHovered&&'BigAvatar'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Avatar src={avatar} size='large'/>
                        <div className="loginCard" style={{display: (showStatus && isHovered) ? 'flex' : 'none'}}>
                            {isLogin?<Button type={"primary"} style={{width:50,height:20,fontSize:10,padding:"0 0 0" +
                                    " 2px"}} onClick={()=>navigate('dashboard')}>进入后台</Button>:<Button type={"primary"} style={{width:50,height:20,fontSize:10,padding:"0 0 0 2px"}} onClick={()=>navigate('login')}>登录</Button>}
                        </div>
                    </div>
                </div>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        boxShadow: 'none'
                    },
                    components: {
                        Modal: {
                            contentBg: 'transparent'
                        },
                    },
                }}
            >
                <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={'100vh'} >
                    <div style={{height:'80vh'}} className='searchModal'>
                        <input type="search" className='searchModalInput' placeholder={'输入你想搜索的内容吧 ...'}/>
                        <Card style={{width:'80%',height: '90%',overflowY:'auto'}} title="搜索结果" bordered={false}/>
                    </div>
                </Modal>
            </ConfigProvider>
            {animation !== '' && <MoonToSun status={animation} />}
        </header>
    );
};

export default Head;
