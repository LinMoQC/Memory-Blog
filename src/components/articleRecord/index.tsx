import './index.sass'
import {Space} from "antd";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NoteType} from "../../interface/NoteType";
import dayjs from "dayjs";
import {renderNoteTags} from "../../apis/TagMethods.tsx";
import {getAllNotes} from "../../apis/NoteMethods.tsx";
interface ArticleRecordProps {
    isDark: string
}
const ArticleRecord = ({isDark}: ArticleRecordProps) => {
    const [newNotes,setNewNotes] = useState<NoteType[]>([]);
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)

    useEffect(() => {
        getAllNotes().then((res) => {
            setNewNotes(res.data.data.map((item: { noteTags: string; }) => {
                return {
                    ...item,
                    noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                }
            }))
        })
    }, []);

    return <div className="articleRecord">
        <div className="articleRecordImg">
            <img src="https://ghchart.rshah.org/409ba5/LinMoQC" />
        </div>
        <div className="articleRecordBox" style={{overflowY:"auto"}}>
            <h3>最新文章</h3>
            {newNotes.map(item => (
                <div className="articleRecordCard in" key={item.key} style={{background: isDark ? 'rgba(0,0,0,0.33)' : 'rgba(255,255,255,0.33)'}}>
                    <div className="post-date">
                        <span><i className="iconfont icon-naozhong icon" style={{ fontSize: 22, display: 'inline',verticalAlign: 'middle' }}></i>
                            {dayjs(item.updateTime).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className="article_cord">
                        <h3>" {item.noteTitle} "</h3>
                        <div style={{
                            textAlign: "left",
                            marginLeft: 25,
                            marginTop: 8,
                            marginRight: 60,
                            textIndent: '2em',
                            whiteSpace: "normal",
                            maxHeight: '2.5em',
                            lineHeight: '1.3em', /* 行高 */
                            overflow: 'hidden',
                            fontWeight: 500,
                            textOverflow: 'ellipsis'
                        }}>
                            <p>{item.description}</p>
                        </div>

                        <div className="tags">
                            <Space size={[0, 8]} wrap>
                            {renderNoteTags(item.noteTags,tagList)}
                            </Space>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default ArticleRecord