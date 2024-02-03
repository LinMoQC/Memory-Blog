import './index.sass';
import { Avatar, Card, Tabs } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import avator from "../../../assets/avator.jpg";

interface Friend {
    sitename: string;
    avator: string;
    siteurl: string;
    desciption: string;
}

const friendsData: Friend[] = [
    {
        sitename: 'Kano酱的博客',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1656780415433.png',
        siteurl: 'https://kanochan.net',
        desciption: '记录生活、技术与动漫的博客.',
    },
    {
        sitename: '小明的小窝',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/3c850b578662bff5.png',
        siteurl: 'https://xiaomingblog.com',
        desciption: '一个喜欢分享生活趣事的小窝.',
    },
    {
        sitename: 'Coding天地',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7bb6346225d07aa8d204bd4854615d9b.jpg',
        siteurl: 'https://codingheaven.com',
        desciption: '分享编程技术和开发经验的天地.',
    },
    {
        sitename: '美食之旅',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7ea0a31aea6a8654ced9bee94228e7d8.jpg',
        siteurl: 'https://foodjourney.com',
        desciption: '记录各种美食的味蕾之旅.',
    },
    {
        sitename: '设计师的创意空间',
        avator: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7eb9fece77081700ef0bf31d7099cea0.png',
        siteurl: 'https://designspace.com',
        desciption: '展示设计作品和创意灵感的空间.',
    },
];

const Friends = () => {
    const renderFriendList = () => {
        const friendsChunks = friendsData.reduce((result, friend, index) => {
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
                    <li className='link-item' key={friendIndex}>
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

    return (
        <div style={{ height: '100%', padding: 20, overflowY: 'scroll' }} className='link'>
            <Tabs
                defaultActiveKey="1"
                centered
            >
                {new Array(2).fill(null).map((_, i) => (
                    <Tabs.TabPane
                        tab={i === 0 ? "全部友链" : "友链申请"}
                        key={String(i + 1)}
                    >
                        {i === 0 ? (
                            <>
                                <h3 className="link-title">
                                    <span className="link-fix">Friends</span>
                                </h3>
                                {renderFriendList()}
                            </>
                        ) : (
                            <>
                                <h3 className="link-title">
                                    <span className="link-fix">友链申请</span>
                                </h3>
                                <Card
                                    hoverable
                                    style={{ width: 300, marginTop: 25 }}
                                    className='resCard'
                                    actions={[
                                        <CheckOutlined key="agree" />,
                                        <CloseOutlined key="refused" />
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={avator} />}
                                        title={'LinMo~Blog'}
                                        description={'林陌青川的博客'}
                                    />
                                </Card>
                            </>
                        )}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default Friends;
