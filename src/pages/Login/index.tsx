import './index.sass';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../../store/components/user'; // 请根据实际路径修改
import { useNavigate } from 'react-router-dom';
import getToken from '../../apis/getToken';

const Login: React.FC = () => {
    //hooks区域
    const [account, setAccount] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        console.log(token);
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    //回调函数区域
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'account') {
            setAccount(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            account,
            password,
        };

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const status:number = await dispatch(fetchToken(data))
            if (status === 200) {
                message.success('登录成功');
                navigate('/dashboard');
            } else {
                message.error('登录失败！');
            }
        } catch (error) {
            console.error('登录请求出错', error);
            message.error('登录请求出错，请稍后再试！');
        }
    };

    const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        // 设置自定义错误提示
        message.warning(`请填写${e.currentTarget.placeholder}`);
    };

    return (
        <div className="body">
            <div className="container">
                <div className="back">
                    <div className="BackFilter"></div>
                </div>
                <div className="LoginForm">
                    <div className="LoginContainer">
                        <div className="heading">Sign In</div>
                        <form action="" onSubmit={handleSubmit} className="form">
                            <input
                                required
                                className="input"
                                type="text"
                                name="account"
                                value={account}
                                placeholder="账号"
                                onChange={handleChange}
                                onInvalid={handleInvalid}
                            />
                            <input
                                required
                                className="input"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="密码"
                                onChange={handleChange}
                                onInvalid={handleInvalid}
                            />
                            <input className="login-button" type="submit" value="登录" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
