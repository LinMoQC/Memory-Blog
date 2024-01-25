import { message } from "antd";
import getToken from "../apis/getToken.tsx";
import { Navigate } from "react-router-dom";
import {ReactNode} from "react";
import {jwtDecode} from 'jwt-decode'
import dayjs from "dayjs";
import deleteToken from "../apis/deleteToken.tsx"

export function AuthRouter({ children }: { children: ReactNode }) {
    const token = getToken();
    if (token) {
        const decodedToken = jwtDecode(token)
        if(decodedToken.exp) {
            const isTokenExpired = decodedToken.exp < Date.now() / 1000;
            const expirationDate = dayjs(new Date(decodedToken.exp * 1000)).format('YYYY-MM-DD HH:mm:ss')
            console.log(isTokenExpired + " 过期时间：" + expirationDate)
            return !isTokenExpired ? (<>{children}</>) : (
                message.error('登录失效，请重新登录！'),
                deleteToken(),
                <Navigate to={'/'} replace />
            )
        }else {
            <>{children}</>
        }
    } else {
        message.error("请先登录！");
        return <Navigate to={'/'} replace />;
    }
}