import './index.sass'
import ReactWordcloud from "react-wordcloud";
import {useSelector} from "react-redux";

const WordCloud = () => {
    // @ts-ignore
    const categoryList = useSelector((state) => state.categories.categories).map(item => {
        return {
            text: item.categoryTitle,
            value: item.noteCount
        }
    })


    return <div className="wordCloud">
        <ReactWordcloud words={categoryList} />
    </div>
}

export default WordCloud