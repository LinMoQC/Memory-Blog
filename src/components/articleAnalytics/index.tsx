import {Card, Col, Row, Statistic} from "antd";
import CountUp from "react-countup";
import './index.sass'

const ArticleAnalytics = () => {
    const list = [
        {
            index: 1,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgba(230,240,0,0.3)'}}>✨️</span>文章总数</p>,
            value: 210
        },
        {
            index: 2,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgba(255,0,0,0.3)'}}>❤️️</span>分类总数</p>,
            value: 10
        },
        {
            index: 3,
            name: <p><span className="logo2" style={{ backgroundColor: 'rgb(147,154,216,0.3)'}}>🎯</span>标签总数</p>,
            value: 22
        },
    ]
    const formatter = (value: React.ReactText): React.ReactNode => (
        <CountUp end={Number(value)} separator="," />
    );

    return <>
        <div className="analyticsCard">
            {list.map(item => (
                <Card style={{width: 210,padding: 10,marginBottom:0,fontWeight:'600'}} key={item.index}>
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