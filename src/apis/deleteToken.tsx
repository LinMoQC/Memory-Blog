const getToken = () => {
    return localStorage.removeItem("tokenKey")
}

export default getToken