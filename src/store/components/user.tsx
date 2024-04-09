import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';
import UserState from "../../interface/UserState";
import UserData from "../../interface/UserData";
import deleteToken from "../../apis/deleteToken.tsx";
import {SocialType} from "../../interface/SocialType";

const initialState: UserState = {
    token: localStorage.getItem('tokenKey') || null,
    avatar: '',
    talk: '',
    name: '',
    social: null,
    blogTitle: '',
    blogIcp: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state: UserState, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('tokenKey', action.payload.token);
        },
        setUserInfo: (state: UserState,action: PayloadAction<{avatar:string,talk:string,name:string,blogTitle: string,blogIcp: string}>) => {
            state.avatar = action.payload.avatar;
            state.talk = action.payload.talk;
            state.name = action.payload.name;
            state.blogIcp = action.payload.blogIcp;
            state.blogTitle = action.payload.blogTitle
        },
        setSocial: (state: UserState,action: PayloadAction<SocialType>) => {
            state.social = action.payload
        }
    },
});

const { setToken,setUserInfo,setSocial } = userSlice.actions;
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
                console.log(token)
                dispatch(setToken({ token: token}));
            return res.status;
        } catch (error) {
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
                name: userinfo.data.data.blogAuthor,
                blogTitle: userinfo.data.data.blogTitle,
                blogIcp: userinfo.data.data.blogIcp
            }
            dispatch(setUserInfo(res))
        }catch (error){
            deleteToken()
        }
    }
}

const fetchSocial = () => {
    return async (dispatch: Dispatch<PayloadAction<SocialType>>) => {
        try {
            const social = await http({
                url: '/api/public/social',
                method: "GET"
            })
            dispatch(setSocial(social.data.data))
        }catch (error){
            console.error('Failed to fetch social');
        }
    }
}


export { setToken, fetchToken,fetchUserInfo,fetchSocial };
export default userReducer;
