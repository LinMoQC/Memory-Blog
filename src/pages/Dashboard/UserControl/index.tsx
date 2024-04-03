import {message, Tabs} from 'antd';
import type { TabsProps } from 'antd';
import "./index.sass"
import { Fab, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import { webInfo } from "../../../interface/Setting";
import http from "../../../apis/axios.tsx";
import {useNavigate} from "react-router-dom";
const UserControl = () => {
    const navigate = useNavigate()
    const [webInfo, setWebInfo] = useState<webInfo>({
        blogTitle: '',
        blogAuthor: '',
        blogDomain: '',
        blogDescription: '',
        blogIcp: '',
        userAccount: '',
        userPassword: '',
        userAvatar: '',
        userTalk: '',
        socialGithub: '',
        socialEmail: '',
        socialBilibili: '',
        socialQQ: '',
        socialNeteaseCloud: '',
        openAiToken: '',
        neteaseCookies: '',
        githubToken: ''
    });

    useEffect(() => {
        getSetting()
    }, []);


    const getSetting = () => {
        http({
            url: '/api/protected/websetting',
            method: 'GET'
        }).then((res) => {
            if(res.status === 200){
                setWebInfo(res.data.data)
            }
        })
    }

    const comeBack = () => {
        navigate(-1)
    }

    const handleChange = (event: { target: { id: string; value: string; }; }) => {
        const { id, value } = event.target;
        setWebInfo({ ...webInfo, [id]: value });
    };


    const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        http({
            url: '/api/protected/websetting',
            method: 'POST',
            data: webInfo
        }).then((res) => {
            if(res.status === 200){
                getSetting()
                message.success("保存成功")
            }
        })
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <h3>站点信息</h3>,
            children: <>
                <form className='web_setting' onSubmit={handleSubmit}>
                    <TextField
                        id="blogTitle"
                        label="博客标题"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.blogTitle}
                    />
                    <TextField
                        id="blogAuthor"
                        label="博客作者"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.blogAuthor}
                    />
                    <TextField
                        id="blogDomain"
                        label="博客域名"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.blogDomain}
                    />
                    <TextField
                        id="blogDescription"
                        label="博客描述"
                        multiline
                        rows={4}
                        defaultValue="介绍一下你的博客吧..."
                        style={{ width: '70%', marginBottom: 20 }}
                        color='primary'
                        focused
                        onChange={handleChange}
                        value={webInfo.blogDescription}
                    />
                    <TextField
                        id="blogIcp"
                        label="ICP信息"
                        variant="outlined"
                        color='primary'
                        focused
                        size='medium'
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.blogIcp}
                    />
                    <div style={{ justifyContent: 'flex-end', display: 'flex', width: '70%' }}>
                        <Button variant="contained" style={{ width: 100 }} type='submit'>保存</Button>
                    </div>
                </form>
            </>,
        },
        {
            key: '2',
            label: <h3>用户信息</h3>,
            children: <>
                <form className='web_setting' onSubmit={handleSubmit}>
                    <TextField
                        id="userAccount"
                        label="用户账号"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.userAccount}
                    />
                    <TextField
                        id="userPassword"
                        label="用户密码"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.userPassword}
                        type={"password"}
                    />
                    <TextField
                        id="userAvatar"
                        label="用户头像"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.userAvatar}
                    />
                    <TextField
                        id="userTalk"
                        label="个性签名"
                        variant="outlined"
                        color='primary'
                        focused
                        size='medium'
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.userTalk}
                    />
                    <div style={{ justifyContent: 'flex-end', display: 'flex', width: '70%' }}>
                        <Button variant="contained" style={{ width: 100 }} type='submit'>保存</Button>
                    </div>
                </form>
            </>,
        },
        {
            key: '3',
            label: <h3>社交媒体</h3>,
            children: <>
                <form className='web_setting' onSubmit={handleSubmit}>
                    <TextField
                        id="socialGithub"
                        label="Github"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.socialGithub}
                    />
                    <TextField
                        id="socialBilibili"
                        label="Bilibili"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.socialBilibili}
                    />
                    <TextField
                        id="socialEmail"
                        label="Email"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.socialEmail}
                    />
                    <TextField
                        id="socialQQ"
                        label="QQ"
                        variant="outlined"
                        color='primary'
                        focused
                        size='medium'
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.socialQQ}
                    />
                    <TextField
                        id="socialNeteaseCloud"
                        label="Netease Cloud"
                        variant="outlined"
                        color='primary'
                        focused
                        size='medium'
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.socialNeteaseCloud}
                    />
                    <div style={{ justifyContent: 'flex-end', display: 'flex', width: '70%' }}>
                        <Button variant="contained" style={{ width: 100 }} type='submit'>保存</Button>
                    </div>
                </form>
            </>,
        },
        {
            key: '4',
            label: <h3>其他设置</h3>,
            children: <>
                <form className='web_setting' onSubmit={handleSubmit}>
                    <TextField
                        id="openAiToken"
                        label="OpenAI Token"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.openAiToken}
                    />
                    <TextField
                        id="NeteaseCookies"
                        label="Netease Cookies"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.neteaseCookies}
                    />
                    <TextField
                        id="GithubToken"
                        label="Github Token"
                        variant="outlined"
                        size='medium'
                        color='primary'
                        focused
                        style={{ width: '70%', marginBottom: 20 }}
                        onChange={handleChange}
                        value={webInfo.githubToken}
                    />
                    <div style={{ justifyContent: 'flex-end', display: 'flex', width: '70%' }}>
                        <Button variant="contained" style={{ width: 100 }} type='submit'>保存</Button>
                    </div>
                </form>
            </>,
        },
    ];

    return (
        <div style={{ padding: 20,overflowY:'scroll' }} className='allin'>
            <Fab variant="circular" size='small' style={{ position: 'absolute', cursor: 'pointer' }} onClick={comeBack}>
                <ArrowBackIosIcon fontSize='small' style={{cursor:'pointer'}}/>
            </Fab>
            <Tabs defaultActiveKey="1" items={items} centered={true} />
        </div>
    );
}

export default UserControl;
