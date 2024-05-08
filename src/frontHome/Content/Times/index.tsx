import './index.sass'
import { useEffect, useState } from "react";
import {Timeline} from 'antd';
import dayjs from "dayjs";
import { motion } from 'framer-motion';
import scrollToTop from "../../../utils/scrollToTop.tsx";
import {getNotes} from "../../../apis/NoteMethods.tsx";
import {useNavigate} from "react-router-dom";
const Times = () => {
    const [timeList, setTimeList] = useState([]);
    const navigate = useNavigate()
    const [todayInfo, setTodayInfo] = useState({
        year: '',
        dayOfYear: 0,
        yearPercentage: 0,
        dayPercentage: 0
    });

    useEffect(() => {
        scrollToTop();
        getNotes().then((res) => {
            setTimeList(res.data.data.map((item: { createTime: Date; noteTitle: string; noteKey:string}) => {
                return {
                    children:<p style={{width:'90%',display:'flex',justifyContent:'space-between'}} className='Link' onClick={() => navigate(`/article/${item.noteKey}`)}>{item.noteTitle}<span>{dayjs(item.createTime).format('YYYY-MM-DD')}</span></p>
                }
            }))
        })

        const updateTodayInfo = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 0);
            // @ts-ignore
            const diff = now - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);

            const totalDays = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || now.getFullYear() % 400 === 0 ? 366 : 365;
            const yearPercentage = (dayOfYear / totalDays) * 100;
            let dayPercentage = ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100;

            dayPercentage = parseFloat(dayPercentage.toFixed(6));

            setTodayInfo({
                year: now.getFullYear().toString(),
                dayOfYear: dayOfYear + 1,
                yearPercentage: parseFloat(yearPercentage.toFixed(6)),
                dayPercentage: dayPercentage
            });
        };

        updateTodayInfo();

        const intervalId = setInterval(updateTodayInfo, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div className='TimesContainer'>

            <div className="timePass">
                <h2>归档</h2>
                <h3>共有 {timeList.length} 篇文章，再接再厉</h3>
                <hr></hr>

                <motion.div
                    className='Pass'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                <div className='Pass'>
                    <p>今天是 {todayInfo.year} 年的第{todayInfo.dayOfYear}天</p>
                    <p>今年已过 {todayInfo.yearPercentage}%</p>
                    <p>今天已过 {todayInfo.dayPercentage}%</p>
                    <p>活在当下，珍惜眼下</p>
                </div></motion.div>
            </div>

                <Timeline
                    items={timeList}
                    className='timeLine'
                />
    </div>;
}

export default Times;
