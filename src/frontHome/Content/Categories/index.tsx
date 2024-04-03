import './index.sass'
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { categoryList } from "../../../store/components/categories.tsx";
import {NoteType} from "../../../interface/NoteType";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import scrollToTop from "../../../utils/scrollToTop.tsx";
import {searchNotes} from "../../../apis/NoteMethods.tsx";
import {message} from "antd";
import LazyImage from "../../../components/LazyImage";
const Categories = () => {
    const { id } = useParams();
    const [categoryTitle, setCategoryTitle] = useState('');
    const [articleList, setArticleList] = useState([]);
    const categories = useSelector((state: { categories: categoryList }) => state.categories.categories);
    const navigate = useNavigate()

    useEffect(() => {
        scrollToTop();
        const title = categories.find(item => item.pathName === id);
        if (title) {
            setCategoryTitle(title.categoryTitle);
            searchNotes({
                categories: title.categoryTitle,
                status: 'public'
            }).then((res) => {
                setArticleList(res.data.data)
            }).catch(() => {
                message.error("获取失败")
            });
        }
    }, [id, categories]);

    return (
        <div className="CategoriesContainer">
            <h2>分类-{categoryTitle}</h2>
            <h3>共有{articleList.length}篇文章</h3>
            <ul className='ArticleList'>
                {articleList.map((item: NoteType,index) =>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, delay: index * 0.2 ,ease: "linear"}}
                        className="article"
                        onClick={() => navigate(`/article/${item.noteKey}`)}
                    >
                    <li>
                        <LazyImage src={item.cover}/>
                        <div className='article'>
                            <div className="articleTop">
                                <h2>{item.noteTitle}</h2>
                                {item.isTop===1&&<span><i
                                    className="iconfont icon-tuding" style={{fontSize: 23,color:'red'}}></i></span>}
                            </div>
                            <p>{item.description}</p>
                            <div className='articleFooter'><span style={{fontSize:13,color:'#7f7e7e'}} className='post-date'><i className="iconfont icon-naozhong icon" style={{fontSize: 22, display: 'inline',verticalAlign: 'sub'}}></i>发布于 {dayjs(item.updateTime).format('YYYY-MM-DD')}</span>
                                <span style={{color:'#ed5f96',float:'right'}}>阅读全文→</span>
                            </div>
                        </div>
                    </li>
                </motion.div>)}
            </ul>
        </div>
    );
}

export default Categories;
