import { message } from "antd";
import getToken from "../apis/getToken.tsx";
import { Navigate } from "react-router-dom";

export function AuthRouter({ children }) {
    const token = getToken();
    if (token) {
        return <>{children}</>
    }else {
        message.error("请先登录！")
        return <Navigate to={'/'} replace />
    }
}