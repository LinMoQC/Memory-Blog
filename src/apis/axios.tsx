import axios from "axios";
import getToken from "./getToken.tsx"

const baseURL =  process.env["VITE_HTTP_BASEURL "]

const http = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(
    function (config) {
        const token = getToken();
        console.log(token)
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