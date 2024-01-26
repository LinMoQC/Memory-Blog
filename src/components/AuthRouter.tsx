import { useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import deleteToken from '../apis/deleteToken.tsx';
import authToken from '../apis/authToken.tsx';
import { jwtDecode } from 'jwt-decode';
import getToken from "../apis/getToken.tsx";

interface AuthRouterProps {
    children: ReactNode;
}

export function AuthRouter({ children }: AuthRouterProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = getToken();
            if (token) {
                try {
                    const isTokenExpired = await authToken(token);

                    if (isTokenExpired.status === 200) {
                        const decodedToken = jwtDecode(token);
                        if (decodedToken.exp) {
                            const expirationDate = dayjs(new Date(decodedToken.exp * 1000)).format('YYYY-MM-DD HH:mm:ss');
                            console.log('Token is valid. Expiration Date:', expirationDate);
                        }
                    }
                } catch (error) {
                    message.error('登录失效，请重新登录！');
                    deleteToken();
                    navigate('/');
                }
            } else {
                message.error('请先登录！');
                navigate('/');
            }
        };

        checkToken();
    }, []);

    return <>{children}</>;
}
