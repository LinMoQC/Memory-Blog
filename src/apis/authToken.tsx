import http from "./axios.tsx";

const authToken = async (token: string) => {
    return await http({
        url: '/api/login/auth',
        method: 'post',
        data: {token:token}
    })
}

export default authToken