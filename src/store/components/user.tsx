import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';
import UserState from "../../interface/UserState";
import UserData from "../../interface/UserData";
import deleteToken from "../../apis/deleteToken.tsx";

const initialState: UserState = {
    token: localStorage.getItem('tokenKey') || null,
    avatar: '',
    talk: '',
    name: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state: UserState, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('tokenKey', action.payload.token);
        },
        setUserInfo: (state: UserState,action: PayloadAction<{avatar:string,talk:string,name:string}>) => {
            state.avatar = action.payload.avatar;
            state.talk = action.payload.talk;
            state.name = action.payload.name
        }
    },
});

const { setToken,setUserInfo } = userSlice.actions;
const userReducer = userSlice.reducer;

const fetchToken = (data: UserData) => {
    return async (dispatch: Dispatch<PayloadAction<{ token: string }>>) => {
        try {
            const res = await http({
                url: '/api/login',
                method: 'POST',
                data: data
            });
                const token = res.data.data;
                dispatch(setToken({ token: token}));
            return res.status;
        } catch (error) {
            // 处理错误
            throw error;
        }
    };
};

const fetchUserInfo = () => {
    return async (dispatch: Dispatch<PayloadAction<{avatar:string,talk:string}>>) => {
        try{
            const userinfo = await http({
                url: '/api/public/user',
                method: "GET"
            })
            const res = {
                avatar: userinfo.data.data.userAvatar,
                talk: userinfo.data.data.userTalk,
                name: userinfo.data.data.blogAuthor
            }

            dispatch(setUserInfo(res))
        }catch (error){
            console.error('Failed to fetch userinfo:', error);
            deleteToken()
        }
    }
}


export { setToken, fetchToken,fetchUserInfo };
export default userReducer;
