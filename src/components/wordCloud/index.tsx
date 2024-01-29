import './index.sass'
import ReactWordcloud from "react-wordcloud";

const WordCloud = () => {
    const words = [
        { text: '前端', value: 50 },
        { text: '后端', value: 22 },
        { text: 'HTML', value: 18 },
        { text: 'CSS', value: 16 },
        { text: 'JavaScript', value: 20 },
        { text: 'API', value: 15 },
        { text: '数据库', value: 21 },
        { text: '服务器', value: 19 },
        { text: '框架', value: 17 },
        { text: '算法', value: 23 },
        { text: '代码', value: 24 },
        { text: '调试', value: 14 },
        { text: '响应式', value: 16 },
        { text: 'Git', value: 18 },
        { text: '代码库', value: 15 },
        { text: '部署', value: 20 },
        { text: '编程', value: 22 },
        { text: '服务器less', value: 19 },
        { text: '云计算', value: 21 },
    ];


    return <div className="wordCloud">
        <ReactWordcloud words={words} />
    </div>
}

export default WordCloud