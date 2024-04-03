import './index.sass'
import {useEffect, useState} from "react";
import {Avatar, Card, message} from "antd";
import {Talk} from "../../../interface/TalkType";
import {useSelector} from "react-redux";
import UserState from "../../../interface/UserState";
import { motion } from 'framer-motion';
import dayjs from "dayjs";
import scrollToTop from "../../../utils/scrollToTop.tsx";
import {getTalkList} from "../../../apis/TalkMethods.tsx";

const TalkList = () => {
    const [talkList,setTalkList] = useState<Talk[]>([])
    const avatar = useSelector((state:{user:UserState}) => state.user.avatar)
    useEffect(() => {
        scrollToTop(); // 初始化时滚动到顶部
        getTalkList().then((res) => {
            setTalkList(res.data.data)
        }).catch(()=>{
            message.error('获取失败')
        })
    }, [])

    return <div className='TalkContainer'>

        <h2>说说</h2>
        {talkList.map((talk:Talk,index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 ,ease: "linear"}}
            className="article"
            style={{position:'relative'}}
        >
                <h3 className='talkTime'>{dayjs(talk.createTime).format('MM.DD')}</h3>
                <Card
                    key={talk.talkKey}
                    hoverable
                    style={{ width: 700, marginTop: 25 ,fontWeight:600}}
                    className='talk'
                >
                    <Card.Meta
                        avatar={<Avatar src={avatar} />}
                        title={talk.talkTitle}
                        description={talk.content}
                    />
                </Card>
            </motion.div>
        ))}
    </div>
}

export default TalkList