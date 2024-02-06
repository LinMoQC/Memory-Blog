    import './index.sass';
import { Avatar, Card, message, Tabs } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import avator from "../../../assets/avator.jpg";
import CheckButton from "../../../components/Buttons/CheckButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { useState } from "react";
import {Friend} from "../../../interface/FriendType";

// interface Friend {
//     key: number,
//     sitename: string;
//     avator: string;
//     siteurl: string;
//     desciption: string;
// }

//静态数据
const friendsData: Friend[] = [
    {
        key: 1,
        sitename: 'Kano酱的博客',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1656780415433.png',
        siteurl: 'https://kanochan.net',
        desciption: '记录生活、技术与动漫的博客.',
    },
    {
        key: 2,
        sitename: '小明的小窝',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/3c850b578662bff5.png',
        siteurl: 'https://xiaomingblog.com',
        desciption: '一个喜欢分享生活趣事的小窝.',
    },
    {
        key: 3,
        sitename: 'Coding天地',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7bb6346225d07aa8d204bd4854615d9b.jpg',
        siteurl: 'https://codingheaven.com',
        desciption: '分享编程技术和开发经验的天地.',
    },
    {
        key: 4,
        sitename: '美食之旅',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7ea0a31aea6a8654ced9bee94228e7d8.jpg',
        siteurl: 'https://foodjourney.com',
        desciption: '记录各种美食的味蕾之旅.',
    },
    {
        key: 5,
        sitename: '设计师的创意空间',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7eb9fece77081700ef0bf31d7099cea0.png',
        siteurl: 'https://designspace.com',
        desciption: '展示设计作品和创意灵感的空间.',
    },
];

const req: Friend[] = [
    {
        key: 1,
        sitename: 'linmo~Blog',
        avator: avator,
        siteurl: 'baidu.com',
        desciption: '林陌青川的博客'
    },
    {
        key: 2,
        sitename: 'linmo~Blog',
        avator: avator,
        siteurl: 'baidu.com',
        desciption: '林陌青川的博客'
    },
    {
        key: 3,
        sitename: 'linmo~Blog',
        avator: avator,
        siteurl: 'baidu.com',
        desciption: '林陌青川的博客'
    },
    {
        key: 4,
        sitename: 'linmo~Blog',
        avator: avator,
        siteurl: 'baidu.com',
        desciption: '林陌青川的博客'
    },
]

const Friends = () => {
    //状态变量区域
        //选中个数
    const [SelectDelete, setSelectDelete] = useState(0)
        //触发选择框
    const [checkStatus, setCheckStatus] = useState<Record<number, boolean>>({});
    const [staticDate, setStaticDate] = useState<Friend[]>(friendsData); // 假设 Friend 是你的类型
    const [staticReq, setStaticReq] = useState<Friend[]>(req);

    //回调函数区域
        //删除
    const Delete = () => {
        // @ts-ignore
        const keysToDelete = Object.keys(checkStatus).filter(key => checkStatus[key]);

        // 根据 keysToDelete 过滤 staticDate 数组
        setStaticDate(prevStaticDate => (
            prevStaticDate.filter(item => !keysToDelete.includes(item.key.toString()))
        ));

        // 删除完毕后清空 checkStatus
        message.success('删除成功')
        setCheckStatus({});
        setSelectDelete(0)
    }

    // 触发选择框和图片点击
    const handleItemClick = (key: number) => {
        // 检查当前图片对应的复选框状态
        const isChecked = checkStatus[key] || false;
        console.log(isChecked)

        // 更新复选框状态
        setCheckStatus(prevState => ({
            ...prevState,
            [key]: !isChecked // 切换复选框状态
        }));

        // 更新选择的数量
        setSelectDelete(prevCount => isChecked ? prevCount - 1 : prevCount + 1);
    };

    const renderFriendList = () => {
        const friendsChunks = staticDate.reduce((result, friend, index) => {
            const chunkIndex = Math.floor(index / 5);
            if (!result[chunkIndex]) {
                // @ts-ignore
                result[chunkIndex] = [];
            }
            // @ts-ignore
            result[chunkIndex].push(friend);
            return result;
        }, []);



        return friendsChunks.map((friends, chunkIndex) => (
            <ul className='link-items' key={chunkIndex}>
                {/*// @ts-ignore*/}
                {friends.map((item, friendIndex) => (
                    <li className='link-item' key={friendIndex} onClick={() => handleItemClick(item.key)}>
                        <div style={{ position: 'absolute', right: 5, top: 5 }}>
                            <CheckButton
                                checked={checkStatus[item.key] || false}
                                handleCheckBoxChange={(e) => {
                                    e.stopPropagation();
                                    handleItemClick(item.key);
                                }}
                            />
                        </div>
                        <a
                        >
                            <img
                                alt={item.sitename}
                                className="lazyload"
                                data-src={item.avator}
                                src={item.avator}
                            />
                            <br />
                            <span className="sitename">{item.sitename}</span>
                            <div className="linkdes">{item.desciption}</div>
                        </a>
                    </li>
                ))}
            </ul>
        ));
    };

    //申请处理函数
    const agree = (key: number) => {
        const updatedStaticDate = [
            ...staticDate,
            staticReq.find(item => item.key === key)
        ];
        if (Array.isArray(updatedStaticDate)) {

            setStaticReq(staticReq.filter(item => item.key !== key));
            // @ts-ignore
            setStaticDate(updatedStaticDate)
        }
        message.success('已添加')
    }

    const refused = (key: number) => {
        const updatedStaticReq = staticReq.filter(item => item.key !== key);
        setStaticReq(updatedStaticReq);
        message.success('已拒绝')
    }
    return (
        <div style={{ height: '100%', padding: 20, overflowY: 'scroll' }} className='link'>
            <Tabs
                defaultActiveKey="1"
                centered
            >
                {new Array(2).fill(null).map((_, i) => (
                    <Tabs.TabPane
                        tab={i === 0 ? <h3>全部友链</h3> : <h3>友链申请</h3>}
                        key={String(i + 1)}
                    >
                        {i === 0 ? (
                            <>
                                <h3 className="link-title">
                                    <span className="link-fix">Friends</span>
                                </h3>
                                <div style={{ float: 'right' }}>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <h3 style={{ position: "absolute", right: 180, opacity: SelectDelete !== 0 ? 1 : 0, transition: '0.3s' }}>已选中{SelectDelete}条友链</h3>
                                        <div style={{ transform: 'scale(0.8)' }} onClick={Delete}>
                                            <DeleteButton />
                                        </div>
                                    </div>
                                </div>
                                {renderFriendList()}
                            </>
                        ) : (
                            <>
                                <h3 className="link-title">
                                    <span className="link-fix">友链申请</span>
                                </h3>
                                <div style={{ display: 'grid',gridTemplateColumns:'repeat(auto-fit, minmax(210px,' +
                                        ' 1fr))', gridGap:90}}>
                                    {
                                        staticReq.map(item => (
                                            <Card
                                                hoverable
                                                style={{ width: 270, marginTop: 25 }}
                                                className='resCard'
                                                actions={[
                                                    <CheckOutlined key="agree" onClick={() => agree(item.key)} />,
                                                    <CloseOutlined key="refused" onClick={() => refused(item.key)} />
                                                ]}
                                                key={item.key}>
                                                <Card.Meta
                                                    avatar={<Avatar src={item.avator} />}
                                                    title={item.sitename}
                                                    description={item.desciption}
                                                />
                                            </Card>
                                        ))
                                    }
                                </div>
                            </>
                        )}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default Friends;
