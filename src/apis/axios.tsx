import axios from "axios";
import getToken from "./getToken.tsx"

const http = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(
    function (config) {
        // 在预检请求和实际请求中都添加 token
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);



export default http