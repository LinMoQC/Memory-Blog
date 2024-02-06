import './index.sass'
import {Space, Tag} from "antd";
interface ArticleRecordProps {
    isDark: string
}
const ArticleRecord = ({isDark}: ArticleRecordProps) => {
    const articleList = [
        {
            index: 1,
            name: "深入理解神经网络",
            content: "本文探讨了神经网络的工作原理以及它在机器学习和人工智能中的应用。从感知器到深度学习，了解神经网络的发展历程。",
            time: "2024-02-15T10:30:00",
            tags: ["神经网络", "机器学习", "人工智能"]
        },
        {
            index: 2,
            name: "构建高性能的Web应用",
            content: "通过优化前端和后端代码，本文介绍了构建高性能Web应用的最佳实践。包括性能监测、代码分割、缓存策略等方面的建议。",
            time: "2024-02-14T14:45:00",
            tags: ["Web开发", "性能优化", "前端", "后端"]
        },
        {
            index: 3,
            name: "掌握数据结构与算法",
            content: "深入研究常见的数据结构和算法，讨论它们的优缺点以及在解决实际问题中的应用。包括排序算法、图算法、动态规划等。",
            time: "2024-02-13T18:00:00",
            tags: ["数据结构", "算法", "编程"]
        },
        {
            index: 4,
            name: "容器化应用与Docker",
            content: "学习如何使用Docker容器技术来简化应用的部署和管理。了解容器的基本概念、Dockerfile的编写以及容器编排工具的使用。",
            time: "2024-02-12T09:15:00",
            tags: ["Docker", "容器化", "DevOps"]
        }
    ];


    return <div className="articleRecord">
        <div className="articleRecordImg">
            <img src="https://ghchart.rshah.org/409ba5/LinMoQC" alt="2016rshah's Blue Github Chart" />
        </div>
        <div className="articleRecordBox" style={{overflowY:"auto"}}>
            <h3>最新文章</h3>
            {articleList.map(item => (
                <div className="articleRecordCard in" key={item.index} style={{background: isDark ? 'rgba(0,0,0,0.33)' : 'rgba(255,255,255,0.33)'}}>
                    <div className="post-date">
                        <span><i className="iconfont icon-naozhong icon" style={{ fontSize: 22, display: 'inline',verticalAlign: 'middle' }}></i>
    发布于6天前</span>
                    </div>
                    <div className="article_cord">
                        <h3>" {item.name} "</h3>
                        <p style={{textAlign: "left" ,marginLeft: 25,marginTop: 8,marginRight: 60,color: 'color:' +
                                ' rgba(0,0,0,.66)',textIndent: '2em'}}>{item.content}</p>
                        <div className="tags">
                            {item.tags.map((tag,index) => (
                                <Space size={[0, 8]} wrap key={index}>
                                    <Tag color="#55acee" style={{color: 'black'}}>
                                        {tag}
                                    </Tag>
                                </Space>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default ArticleRecord