import {Card, Col, Row, Statistic} from "antd";
import CountUp from "react-countup";
import './index.sass'
import {useSelector} from "react-redux";
import {noteList} from "../../store/components/note.tsx";

const ArticleAnalytics = () => {
    const tagCount = useSelector((state: {tags: any}) => state.tags.tagCount)
    const noteCount = useSelector((state: { notes:noteList  }) => state.notes.noteCount);
    // @ts-ignore
    const categoryCount = useSelector((state) => state.categories.categoryCount)
    const list = [
        {
            index: 1,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgba(230,240,0,0.3)'}}>✨️</span>文章总数</p>,
            value: noteCount
        },
        {
            index: 2,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgba(255,0,0,0.3)'}}>❤️️</span>分类总数</p>,
            value: categoryCount
        },
        {
            index: 3,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgb(147,154,216,0.3)'}}>🎯</span>标签总数</p>,
            value: tagCount
        },
    ]
    const formatter = (value: React.ReactText): React.ReactNode => (
        <CountUp end={Number(value)} separator="," />
    );

    return <>
        <div className="analyticsCard">
            {list.map(item => (
                <Card className='akCard' key={item.index}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title={item.name} value={item.value} formatter={formatter}/>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    </>
}

export default ArticleAnalytics