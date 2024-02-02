import './index.sass'
import {Breadcrumb, Menu, MenuProps} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {Outlet, useNavigate} from "react-router-dom";


const Notes = () => {
    const navigate = useNavigate()
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

    const ClickMenu: MenuProps['onClick'] = (e) => {
        // @ts-ignore
        navigate(e.item.props.to)
    };

    // 获取当前路由的 title
    const currentHash = window.location.hash;
    return <>
        <div className="header">
            <Menu style={{ width: 125 }} mode="vertical" items={items} className="twoMenu" onClick={ClickMenu} defaultSelectedKeys={['1']}  theme={"light"}/>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        title: (
                            <>
                                <UserOutlined />
                                <span>笔记</span>
                            </>
                        ),
                    },
                    {
                        title: currentHash === '#/dashboard/notes' ? '全部文章' :
                            currentHash === '#/dashboard/notes/' ? '全部文章' :
                            currentHash === '#/dashboard/notes/newnote' ? '编辑文章' :
                                currentHash === '#/dashboard/notes/allcategorize' ? '全部分类' :
                                    currentHash === '#/dashboard/notes/alltags' ? '全部标签' :
                                        '未知页面',
                    },
                ]}
                style={{marginLeft:10}}
            />
        </div>
        <Outlet />
    </>
}

export default Notes