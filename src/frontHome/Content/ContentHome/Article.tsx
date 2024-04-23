import LazyImage from "../../../components/LazyImage";
import {Avatar} from "antd";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {NoteType} from "../../../interface/NoteType";
import {CategoriesType} from "../../../interface/CategoriesType";
import {renderNoteTags} from "../../../apis/TagMethods.tsx";
import dayjs from "dayjs";

interface tag
{
    tagKey: number;
    color: string;
    title: string;
    children: any[]
}
interface ArticleOption {
    item: NoteType
    index: number
    Categories: CategoriesType[]
    avatar: string
    name: string
    tagList: tag[]
}

const Article:React.FC<ArticleOption> = ({ item, index, Categories, avatar, name, tagList }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            ref={elementRef}
            className="article"
        >
            <div className="ArticleCard" onClick={() => navigate(`/article/${item.key}`)}>
                <div className="ArticleCover">
                    {isVisible && <LazyImage src={item.cover} />}
                </div>

                <div className="ArticleContent">
                    <h4 style={{ color: Categories.find(category => category.categoryTitle === item.noteCategory)?.color }}>
                        # {Categories.filter(category => category.categoryKey === item.noteCategory).map(item => item.categoryTitle)}
                    </h4>
                    <h3 className='ArticleTitle'>{item.noteTitle}</h3>
                    <p>{item.description}</p>
                    <div className='tags' style={{ width: '100%', marginTop: '10px' }}>
                        {renderNoteTags(item.noteTags,tagList)}
                    </div>
                    <div className="ArticleFooter">
                        <Avatar src={avatar} size={40} style={{ marginRight: 10 }} />
                        <span style={{ marginRight: 10 }}>{name}</span>
                        <span style={{ fontSize: 13, color: '#7f7e7e' }} className='post-date'>
                            <i className="iconfont icon-naozhong icon" style={{ fontSize: 22, display: 'inline', verticalAlign: 'sub' }}></i>
                            发布于 {dayjs(item.updateTime).format("YYYY-MM-DD")}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Article;