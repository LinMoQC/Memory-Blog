import {createSlice} from "@reduxjs/toolkit";
import http from "../../apis/axios.tsx";
import {Dispatch} from "react";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: ''||localStorage.getItem("tokenKey")
    },
    reducers: {
        setToken(state:any, action){
            state.token = action.payload
            localStorage.setItem('tokenKey',state.token)
        }
    }
})

const { setToken } = userStore.actions
const userReducer = userStore.reducer

const fetchToken =  (data: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const res = await http({
                url: '/user',
                method: 'GET'
            })
            if(data.account === res.data[0].account&&data.password === res.data[0].password){
                dispatch(setToken(res.data[0].token))
                return res.request
            }else{
                return {
                    status: 401
                }
            }

        }catch (error) {
            // 处理错误
            console.error('Failed to fetch token:', error);
            throw error
        }
    }
}

export {setToken, fetchToken}
export default userReducer