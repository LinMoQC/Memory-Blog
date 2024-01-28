import { Card } from "antd";
import './index.sass';
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [oneSay, setOneSay] = useState('');

    useEffect(() => {
        const getSay = async () => {
            const res = await axios.get('https://zj.v.api.aa1.cn/api/wenan-zl/?type=json');
            setOneSay(res.data.msg);
        };
        getSay();
    }, []);

    return (
        <div className="home">
            <Card size="small" title={
                <div className="custom-card-header">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    每日箴言
                </div>
            } style={{ maxWidth: 350, height: 200 }}>
                <div className="oneSay">
                    <span className="stick">📌</span>
                    <p className="onesay_content">{oneSay}</p>
                </div>
            </Card>
        </div>
    );
};

export default Home;
