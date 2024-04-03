import {useEffect, useRef, useState} from 'react';
import './index.css';
// import '../../assets/font/iconfont.js';
// import '../../assets/font/iconfont.css';
import {Outlet, useNavigate} from "react-router-dom";
import deleteToken from "../../apis/deleteToken.tsx";
import {Button, Space, notification, message, Card, Spin} from "antd";
import MainContext from "../../components/conText.tsx";
import Switch from "../../components/Switch";
import SettingButton from "../../components/Buttons/SettingButton";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo} from "../../store/components/user.tsx";
import UserState from "../../interface/UserState";
import {fetchCategories} from "../../store/components/categories.tsx";
import {fetchTags} from "../../store/components/tags.tsx";
import {fetchNoteList} from "../../store/components/note.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Dashboard = () => {
    //hooks区域
    const navigate = useNavigate();
    const [SelectCurrent,setSelectCurrent] = useState(1)
    const [isShellClosed, setShellClosed] = useState(true);
    const [isDarkMode, setDarkMode] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const avatar = useSelector((state: { user: UserState }) => state.user.avatar);
    const name = useSelector((state: { user: UserState }) => state.user.name);

    //初始渲染
    useEffect(() => {
        dispatch<any>(fetchUserInfo())
        dispatch<any>(fetchCategories())
        dispatch<any>(fetchTags())
        dispatch<any>(fetchNoteList())
        const DarkSwitch = localStorage.getItem('isDarkMode')
        const currentHashCode =
            location.hash === '#/dashboard' ? 1 :
                location.hash === '#/dashboard/notes' ? 2 :
                    location.hash === '#/dashboard/comments' ? 3 :
                        location.hash === '#/dashboard/albums' ? 4 :
                            location.hash === '#/dashboard/friends' ? 5 :
                                location.hash === '#/dashboard/analytics' ? 6 :
                                    location.hash.startsWith('#/dashboard/notes') ? 2 : 1;
        setSelectCurrent(currentHashCode)
        setLoading(true);
        if(DarkSwitch!==null){
            setDarkMode(JSON.parse(DarkSwitch));

        }
    },[])

    //回调函数区域
    const openNotification = () => {
        const key = `open${Date.now()}`
        const btn = (
            <Space>
                <Button type="link" size="small" onClick={() => api.destroy()}>
                    返回
                </Button>
                <Button type="primary" size="small" onClick={() => {
                    deleteToken()
                    navigate('/')
                    message.success('退出成功')
                }}>
                    确认
                </Button>
            </Space>
        );
        api.open({
            message: '退出确认',
            btn,
            key,
        });
    };

    const handleToggleClick = () => {
        setShellClosed(!isShellClosed);
    };

    const handleSearchClick = () => {
        setShellClosed(false);
    };

    const handleModeSwitch = () => {
        setDarkMode(!isDarkMode);
        localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
    };

    // 导航栏数据
    const sidebar = [
        {
            index: 1,
            name: '主页',
            icon: 'icon-shouyefill',
            to: '',
            active: false
        },
        {
            index: 2,
            name: '笔记',
            icon: 'icon-bianji2',
            to: 'notes',
            active: false,
            children: [
                {
                    index: 201,
                    name: '全部文章',
                    to: 'allnotes',
                },
                {
                    index: 202,
                    name: '编辑文章',
                    to: 'newnote',
                },{
                    index: 203,
                    name: '全部分类',
                    to: 'allcategorize',
                },{
                    index: 204,
                    name: '全部标签',
                    to: 'alltags',
                },
            ]
        },
        {
            index: 3,
            name: '说说',
            icon: 'icon-pinglun2',
            to: 'comments',
            active: false
        },
        {
            index: 4,
            name: '图库',
            icon: 'icon-xiangce',
            to: 'albums',
            active: false
        },
        {
            index: 5,
            name: '友链圈',
            icon: 'icon-youlianguanli',
            to: 'friends',
            active: false
        },
        {
            index: 6,
            name: '数据板',
            icon: 'icon-zhexiantu',
            to: 'analytics',
            active: false
        }
    ]


    //全屏
    const fullScreenRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const toggleFullScreen = () => {
        const elem = fullScreenRef.current;

        if (!isFullScreen) {
            if (elem?.requestFullscreen) {
                elem.requestFullscreen();
            } else { // @ts-ignore
                if (elem?.mozRequestFullScreen) { /* Firefox */
                                // @ts-ignore
                    elem.mozRequestFullScreen();
                            } else { // @ts-ignore
                    if (elem?.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                                                    // @ts-ignore
                        elem.webkitRequestFullscreen();
                                                } else { // @ts-ignore
                        if (elem?.msRequestFullscreen) { /* IE/Edge */
                                                                            // @ts-ignore
                            elem.msRequestFullscreen();
                                                                        }
                    }
                }
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                // @ts-ignore
            } else if (document.mozCancelFullScreen) { /* Firefox */
                // @ts-ignore
                document.mozCancelFullScreen();
                // @ts-ignore
            } else if (document.webkitExitFullscreen) {
                // @ts-ignore/* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
                // @ts-ignore
            } else if (document.msExitFullscreen) { /* IE/Edge */
                // @ts-ignore
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    return (
        <div className={`contain ${isDarkMode ? 'dark' : ''}`}>
            {!loading ? (
                <div className="loading-overlay">
                    <Spin tip="Loading..." className="loading">
                    </Spin>
                </div>
            ) : (
                <>

                    <div className={`content ${isDarkMode ? 'contentDark' : ''}`} ref={fullScreenRef}>
                        <div className={`shell ${isShellClosed ? 'close' : ''} ${isDarkMode ? 'dark' : ''} slider`}>
                            <nav className={`shell ${isShellClosed ? 'close' : ''} ${isDarkMode ? 'dark' : '' }`}>
                                <header>
                                    <div className="image-text">
                        <span className="image">
                            <img src={avatar} alt="" />
                        </span>
                                        <div className="text logo-text">
                                            <span className="name">
                                                {name}
                                            </span>
                                        </div>
                                    </div>
                                    <i className="iconfont icon-iconfonticonfontarrowright toggle" onClick={handleToggleClick} style={{fontSize: 20}}></i>
                                </header>

                                <div className="menu-bar">
                                    <div className="menu">
                                        <li className="search-box" onClick={handleSearchClick}>
                                            <i className="iconfont icon-sousuo1 icon"></i>
                                            <input type="text" placeholder="search..." />
                                        </li>

                                        <ul className="menu-links">
                                            {sidebar.map(item => (
                                                <li className={`nav-links ${SelectCurrent === item.index ? 'nav_select' : ''}`}
                                                    onClick={() => {
                                                        navigate(item.to)
                                                        setSelectCurrent(item.index)
                                                    }} key={item.index}>
                                                    <i className={`iconfont ${item.icon} icon`}></i>
                                                    <span className="text nac-text">{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bottom-content">
                                        <li className="nav-links" onClick={() => navigate('usercontrol')}>
                                            <i className="iconfont icon-iconfontcog icon"></i>
                                            <span className="text nac-text">用户管理</span>
                                        </li>

                                        <li className="nav-links" onClick={openNotification}>
                                            <i className="iconfont icon-tuichu icon"></i>
                                            <span className="text nac-text">退出登录</span>
                                        </li>

                                        <li className="mode">
                                            <div className="sun-moon">
                                                {isDarkMode?<i className={`iconfont icon-taiyang1 icon ${isDarkMode ? 'moon' : 'sun'}`}></i>:
                                                    <i className={`iconfont icon-moonyueliang icon ${isDarkMode ? 'sun' : 'moon'}`}></i>}
                                            </div>
                                            <span className="mode-text text">{isDarkMode ? '白日模式' : '夜间模式'}</span>
                                            <div className="toggle-switch">
                                                <Switch handleModeSwitch={handleModeSwitch} isDarkMode={isDarkMode}/>
                                            </div>

                                        </li>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <Card style={{ width: "90%",height: '95%' ,marginLeft:80}} className={`Card ${isDarkMode ? 'CardDark' : ''}`}>
                            <MainContext.Provider value={isDarkMode.toString()}>
                                <Outlet />
                            </MainContext.Provider>
                        </Card>

                        {/*  悬浮按钮  */}

                        <div className='setting_btn' onClick={()=>toggleFullScreen()}>
                            <SettingButton />
                        </div>
                    </div>

            {contextHolder}
                </>
                )}
        </div>
    );
};

export default Dashboard;
