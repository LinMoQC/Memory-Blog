import {useEffect, ReactNode} from 'react';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
import getToken from "../apis/getToken.tsx";

interface AuthRouterProps {
    children: ReactNode;
}

export function AuthRouter({children}: AuthRouterProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            message.error('请先登录！');
            navigate('/');
        }
    }, []);

    return <>{children}</>;
}
