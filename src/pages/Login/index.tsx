import './index.sass';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {fetchToken} from "../../store/components/user.tsx";
import { useNavigate } from 'react-router-dom';
import getToken from '../../apis/getToken';
import UserData from "../../interface/UserData";

const Login: React.FC = () => {
    //hooks区域
    const [account, setAccount] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
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

        const data:UserData = {
            username:account,
            password,
        };

        try {
            const status:number = await dispatch<any>(fetchToken(data))
            if (status === 200) {
                message.success('登录成功');
                navigate('/dashboard');
            }
        } catch (error) {
            message.error('登录失败，账号或密码错误！');
        }
    };

    const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        // 设置自定义错误提示
        message.warning(`请填写${e.currentTarget.placeholder}`);
    };

    return (
        <div className="login-box">
            <h2>Memory</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="user-box">
                    <input type="text" name="account"
                           value={account}
                           required
                           onChange={handleChange}
                           onInvalid={handleInvalid}
                           autoComplete='off'
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password"
                           required
                           value={password}
                           onChange={handleChange}
                           onInvalid={handleInvalid}
                           autoComplete='off'
                           />
                    <label>Password</label>
                </div>
                <a>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <input type="submit" value="Submit" />
                </a>
            </form>
        </div>

    );
};

export default Login;