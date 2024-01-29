import {Calendar, CalendarProps, Card, ConfigProvider, Progress, Space, theme} from "antd";
import './index.sass';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import dayjs, {Dayjs} from "dayjs";
import 'dayjs/locale/zh-cn';
import zhCN from "antd/lib/locale/zh_CN";
import ArticleRecord from "../../../components/articleRecord";
import TheYearPass from "../../../components/theYearPass";
import ArticleAnalytics from "../../../components/articleAnalytics";
import WordCloud from "../../../components/wordCloud";
import avator from '../../../assets/avator.jpg'
import Typed from 'typed.js';
const Home = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    dayjs.locale('zh-cn');
    const [oneSay, setOneSay] = useState('');
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 350,
        position: "absolute",
        right: "0",
        bottom: "120px",
        margin: "30px",
        border: "none",
        borderRadius: token.borderRadiusLG,
    };

    const typedRef = useRef(null);

    useEffect(() => {
        const getSay = async () => {
            const res = await axios.get('https://zj.v.api.aa1.cn/api/wenan-zl/?type=json');
            setOneSay(res.data.msg);
        };
        getSay();

        const options = {
            strings: ['"2024,继续加油!“'],  // 使用获取到的数据作为字符串
            typeSpeed: 50,
            backSpeed: 30,
        };

        const typedInstance = new Typed(typedRef.current, options);
        return () => {
            typedInstance.destroy();
        };
    }, []);

        return (
        <div className="home">
            <div className="about_logo">
                <div className="about_me">
                    <img src={avator} alt=""  style={{width:75,height:75,borderRadius: '50%',border: '2px solid #b7b7b7'}}/>
                    <div ref={typedRef} className="typed"></div>
                </div>
                <Space wrap style={{marginTop: 20}}>
                    <Progress type="circle" percent={70} size={65} format={() => 'React'} />
                    <Progress type="circle" percent={50} size={65} format={() => 'Vue'} />
                    <Progress type="circle" percent={70} size={65} format={() => 'Nodejs'} />
                </Space>
            </div>
            <ArticleAnalytics />
            <ArticleRecord/>
            <WordCloud />
            <Card size="small" title={
                <div className="custom-card-header">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    每日箴言
                </div>
            } style={{minWidth: 350, height: 200}}>
                <div className="oneSay">
                    <span className="stick">📌</span>
                    <p className="onesay_content">{oneSay}</p>
                </div>
            </Card>

            <ConfigProvider locale={zhCN}>
                <div style={wrapperStyle}>
                    <TheYearPass/>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default Home;
