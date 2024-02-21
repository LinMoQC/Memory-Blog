import {Calendar, Card, ConfigProvider, Progress, Space, Steps, theme} from "antd";
import './index.sass';
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Dayjs} from "dayjs";
import 'dayjs/locale/zh-cn';
import zhCN from "antd/lib/locale/zh_CN";
import ArticleRecord from "../../../components/articleRecord";
import TheYearPass from "../../../components/theYearPass";
import ArticleAnalytics from "../../../components/articleAnalytics";
import WordCloud from "../../../components/wordCloud";
import Typed from 'typed.js';
import MainContext from "../../../components/conText.tsx";
import {useSelector} from "react-redux";
import UserState from "../../../interface/UserState";
const Home = () => {
    //hooks区域
    const [oneSay, setOneSay] = useState('');
    const typedRef = useRef(null);
    const { token } = theme.useToken();
    const avatar = useSelector((state: { user: UserState }) => state.user.avatar);
    //回调函数区域
    const disabledDate = (current: Dayjs) => {
        // 将current转换为JavaScript的Date对象
        const currentDate = current.toDate();
        // 返回true表示禁用当前日期
        return currentDate && currentDate.getTime() !== new Date().getTime();
    };


    const wrapperStyle: React.CSSProperties = {
        width: '100%',
        height: '50%',
        border: "none",
        borderRadius: token.borderRadiusLG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    //初次渲染
    useEffect(() => {
        const getSay = async () => {
            const res = await axios.get('https://api.xygeng.cn/one');
            setOneSay(res.data.data.content);
        };
        getSay();

        const options = {
            strings: ['"遇事不决,<br>&nbsp;可问春风“','"春风不语,<br>&nbsp;即随本心“'],
            typeSpeed: 50,
            backSpeed: 50,
            showCursor: false, // Ensure that the cursor is visible
            cursorChar: '|', // You can customize the cursor character
            contentType: 'html', // Specify that the input strings contain HTML markup
        };

        const typedInstance = new Typed(typedRef.current, options);
        return () => {
            typedInstance.destroy();
        };
    }, []);

    const isDark = JSON.parse(useContext(MainContext))
        return (
        <div className="home">

            <div className='left' style={{height: '100%',width:'25%',display:'flex',flexDirection:'column'}}>
               <div className="about_logo">
                   <div className="about_me">
                       <img src={avatar} alt=""  style={{width:75,height:75,borderRadius: '50%',border: '2px solid #b7b7b7'}}/>
                       <div ref={typedRef} className="typed"></div>
                   </div>
                   <Space wrap style={{marginTop: 20}} className='p_hidden'>
                       <Progress type="circle" percent={70} size={65} format={() => <span style={{color:isDark?"white":'black'}}>CPU</span>}/>
                       <Progress type="circle" percent={50} size={65} format={() => <span style={{color:isDark?"white":'black'}}>内存</span>} />
                       <Progress type="circle" percent={70} size={65} format={() => <span style={{color:isDark?"white":'black'}}>磁盘</span>} />
                   </Space>
               </div>
               <ArticleAnalytics />
               <div style={{display:"flex",justifyContent: 'center',height:'22%',alignItems:'center',flexDirection: 'column'}}>
                   <WordCloud />
               </div>
           </div>

            <div className='center' style={{height: '100%',width:'60%',paddingRight:30}}>
                <ArticleRecord isDark={isDark}/>
            </div>


            <div className='right'>
               <Card size="small" title={
                   <div className="custom-card-header">
                       <span className="dot"></span>
                       <span className="dot"></span>
                       <span className="dot"></span>
                       每日箴言
                   </div>
               } style={{minWidth: 350, height: '30%',margin: 0}}>
                   <div className="oneSay">
                       <span className="stick">🎯</span>
                       <p className="onesay_content">{oneSay}</p>
                   </div>
               </Card>

               <ConfigProvider locale={zhCN}>
                   <div style={wrapperStyle}>
                       <TheYearPass/>
                       <Calendar fullscreen={false}  disabledDate={disabledDate} style={{height:'85%'}}/>
                   </div>
               </ConfigProvider>

               <Card className="cardInfo" style={{margin: 0}}>
                   <h3 style={{marginLeft: 10,marginBottom:10,marginTop:5}}>开发进度</h3>
                   <Steps
                       direction="vertical"
                       current={3}
                       items={[
                           {
                               title: '登录逻辑和后台页面UI',
                           },
                           {
                               title: '静态数据完成后台功能逻辑',
                           },
                           {
                               title: '后端接口开发',
                           },
                       ]}
                   />
               </Card>
           </div>
        </div>
    );

};

export default Home;
