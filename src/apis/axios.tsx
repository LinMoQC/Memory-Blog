import axios from "axios";

const http = axios.create({
    baseURL: 'https://nodejs-six-alpha.vercel.app',
    timeout: 5000
})

export default http