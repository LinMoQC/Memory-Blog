const deleteToken = () => {
    return localStorage.removeItem("tokenKey")
}

export default deleteToken;