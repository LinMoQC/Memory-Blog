
import './index.sass'
import {Breadcrumb, ConfigProvider, Menu, MenuProps} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import MainContext from "../../../components/conText.tsx";

//Menu数据
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    to?: string
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        to
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('导航', 'sub2', <AppstoreOutlined />, [
        getItem('全部文章', '1','',undefined,' '),
        getItem('编辑文章', '2','',undefined,'newnote'),
        getItem('全部分类', '3','',undefined,'allcategorize'),
        getItem('全部标签', '4','',undefined,'alltags'),
    ]),
];

const Notes = () => {
    //hooks区域
    const navigate = useNavigate()
    const [currentHashCode,setCurrentHashCode] = useState('')
    //夜间模式判断
    const isDark = JSON.parse(useContext(MainContext))

    useEffect(() => {
       setCurrentHashCode(location.hash)
    },[])

    // 回调函数区域
    const ClickMenu: MenuProps['onClick'] = (e) => {
        // @ts-ignore
        navigate(e.item.props.to)
    };

    return <>
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedColor: isDark?'rgba(243,243,243,0.88)':'rgba(0,0,0,0.88)',
                        itemSelectedBg: isDark?'rgba(0,0,0,0.58)':'#e6f4ff'
                    },
                    Breadcrumb: {
                        itemColor: isDark?'rgba(243,243,243,0.88)':'rgba(0,0,0,0.88)',
                        lastItemColor: isDark?'rgba(243,243,243,0.88)':'rgba(0,0,0,0.88)',
                        linkColor: isDark?'rgba(243,243,243,0.88)':'rgba(0,0,0,0.88)',
                        separatorColor: isDark?'rgba(243,243,243,0.45)':'rgba(0,0,0,0.45)',
                    }
                },
            }}
        >
            <div className="header">

                <Menu
                    style={{ width: 125 }}
                    mode="vertical"
                    items={items}
                    className="twoMenu"
                    onClick={ClickMenu}
                    defaultSelectedKeys={['1']}
                    theme="light"
                />
                <Breadcrumb style={{ marginLeft: 10 }}>
                    <Breadcrumb.Item>
                        <Link to="/dashboard">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/dashboard/notes">
                            <UserOutlined />
                            <span>笔记</span>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {
                            currentHashCode === '#/dashboard/notes' ? (
                            '全部文章'
                        ) : currentHashCode === '#/dashboard/notes/' ? (
                            '全部文章'
                        ) : currentHashCode === '#/dashboard/notes/newnote' ? (
                            '编辑文章'
                        ) : currentHashCode === '#/dashboard/notes/allcategorize' ? (
                            '全部分类'
                        ) : currentHashCode === '#/dashboard/notes/alltags' ? (
                                '全部标签'
                        ) : (
                                '未知页面'
                        )}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </ConfigProvider>

        <Outlet />
    </>
}

export default Notes