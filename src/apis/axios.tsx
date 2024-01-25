import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:28',
    timeout: 5000
})

export default http