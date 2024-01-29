import './index.sass'
const ArticleRecord = () => {
    const articleList = [
        {
            index: 1,
            name: ''
        },
        {
            index: 2,
            name: ''
        },
        {
            index: 3,
            name: ''
        },
        {
            index: 4,
            name: ''
        }
    ]
    return <div className="articleRecord">
        <div className="articleRecordImg">
            <img src="https://ghchart.rshah.org/409ba5/LinMoQC" alt="2016rshah's Blue Github Chart" />
        </div>
        <div className="articleRecordBox">
            <h3>最新文章</h3>
            {articleList.map(item => (
                <div className="articleRecordCard" key={item.index}>

                </div>
            ))}
        </div>
    </div>
}

export default ArticleRecord