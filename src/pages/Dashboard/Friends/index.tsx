    import './index.sass';
import {Avatar, Card, message, Modal, Tabs} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import CheckButton from "../../../components/Buttons/CheckButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import {useContext, useEffect, useState} from "react";
import {Friend} from "../../../interface/FriendType";
import MainContext from "../../../components/conText.tsx";
import http from "../../../apis/axios.tsx";

const Friends = () => {
    //状态变量区域
        //选中个数
    const [SelectDelete, setSelectDelete] = useState(0)
        //触发选择框
    const [checkStatus, setCheckStatus] = useState<Record<number, boolean>>({});
    const [staticDate, setStaticDate] = useState<Friend[]>([]); // 假设 Friend 是你的类型
    const [staticReq, setStaticReq] = useState<Friend[]>([]);
    const [isDarkMode,setIsDarkMode] = useState(false)
    const Mode = useContext(MainContext)
    const [isModaldelOpen, setIsDelModalOpen] = useState(false);

    useEffect(() => {
        getFriendsList()
            .then((res:Friend[]) => {
               setStaticDate(res.filter(item => item.status === 1 ))
                setStaticReq(res.filter(item => item.status === 0 ))
            })
            .catch((error) => {
                console.error('获取朋友列表时出错:', error);
            });
        const isDark = Mode === 'true';
        setIsDarkMode(isDark)
    },[Mode])


    //获取友链数据
    const getFriendsList = async () => {
        return http({
            url: '/api/public/friends',
            method: 'GET'
        }).then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error);
            throw error; // 将错误重新抛出以传播给调用者
        });
    }



    //回调函数区域
        //删除
    const Delete = () => {
        if (SelectDelete === 0){
            message.warning('待选中')
            return
        }
        // @ts-ignore
        const keysToDelete = Object.keys(checkStatus).filter(key => checkStatus[key]);

        http({
            url: '/api/protected/friends',
            method: 'DELETE',
            data: keysToDelete
        }).then((res) => {
            if(res.status === 200){
                getFriendsList()
                    .then((res:Friend[]) => {
                        setStaticDate(res.filter(item => item.status === 1 ))
                        setStaticReq(res.filter(item => item.status === 0 ))
                        // 删除完毕后清空 checkStatus
                        message.success('删除成功')
                        setCheckStatus({});
                        setSelectDelete(0)
                    })
                    .catch((error) => {
                        console.error('获取朋友列表时出错:', error);
                    });
            }
        })
    }

    const showdelModal = () => {
        if(SelectDelete === 0){
            message.warning("待选中")
            return
        }else {
            setIsDelModalOpen(true);
        }
    };

    const delOk = () => {
        Delete()
        setIsDelModalOpen(false);
    };

    const delCancel = () => {
        setIsDelModalOpen(false);
    };

    // 触发选择框和图片点击
    const handleItemClick = (key: number) => {
        // 检查当前图片对应的复选框状态
        const isChecked = checkStatus[key] || false;

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
                {friends.map((item) => (
                    <li className='link-item' key={item.friendKey} onClick={() => handleItemClick(item.friendKey)}>
                        <div style={{ position: 'absolute', right: 5, top: 5 }} onClick={(event) => {
                            event.stopPropagation()
                        }}>
                            <CheckButton
                                checked={checkStatus[item.friendKey] || false}
                                handleCheckBoxChange={() => {
                                    handleItemClick(item.friendKey);
                                }}
                            />
                        </div>
                        <a
                        >
                            <img
                                alt={item.siteName}
                                className="lazyload"
                                data-src={item.avatar}
                                src={item.avatar}
                            />
                            <br />
                            <span className="sitename">{item.siteName}</span>
                            <div className="linkdes">{item.description}</div>
                        </a>
                    </li>
                ))}
            </ul>
        ));
    };

    //申请处理函数
    const agree = (key: number) => {
        http({
            url: `/api/protected/friends/${key}`,
            method: 'POST'
        }).then((res) => {
            if(res.status === 200){
                getFriendsList()
                    .then((res:Friend[]) => {
                        setStaticDate(res.filter(item => item.status === 1 ))
                        setStaticReq(res.filter(item => item.status === 0 ))
                        message.success('已添加')
                    })
                    .catch((error) => {
                        console.error('获取朋友列表时出错:', error);
                    });
            }
        })
    }

    const refused = (key: number) => {
        http({
            url: `/api/protected/friends`,
            method: 'DELETE',
            data: [key]
        }).then((res) => {
            if(res.status === 200){
                getFriendsList()
                    .then((res:Friend[]) => {
                        setStaticDate(res.filter(item => item.status === 1 ))
                        setStaticReq(res.filter(item => item.status === 0 ))
                        message.success('已拒绝')
                    })
                    .catch((error) => {
                        console.error('获取朋友列表时出错:', error);
                    });
            }
        })
    }
    return (
        <div style={{ height: '100%', padding: 20, overflowY: 'scroll' }} className='link allin'>
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
                                    <span className="link-fix" style={{ color: isDarkMode ? 'cornflowerblue' : 'black' }}>Friends</span>
                                </h3>
                                <div style={{ float: 'right' }}>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <h3 style={{ position: "absolute", right: 180, opacity: SelectDelete !== 0 ? 1 : 0, transition: '0.3s' }}>已选中{SelectDelete}条友链</h3>
                                        <div style={{ transform: 'scale(0.8)' }} onClick={showdelModal}>
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
                                                    <CheckOutlined key="agree" onClick={() => agree(item.friendKey)} />,
                                                    <CloseOutlined key="refused" onClick={() => refused(item.friendKey)} />
                                                ]}
                                                key={item.friendKey}>
                                                <Card.Meta
                                                    avatar={<Avatar src={item.avatar} />}
                                                    title={item.siteName}
                                                    description={item.description}
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

            <Modal title="删除确认" open={isModaldelOpen} onOk={delOk} onCancel={delCancel}  okText="确定" cancelText="取消">
                是否删除选中所有友链?
            </Modal>
        </div>
    );
};

export default Friends;
