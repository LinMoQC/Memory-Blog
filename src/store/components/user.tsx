import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';

interface UserData {
    account: string;
    password: string;
}

interface UserState {
    token: string | null;
}

const initialState: UserState = {
    token: localStorage.getItem('tokenKey') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state: UserState, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('tokenKey', action.payload.token);
        },
    },
});

const { setToken } = userSlice.actions;
const userReducer = userSlice.reducer;

const fetchToken = (data: UserData) => {
    return async (dispatch: Dispatch<PayloadAction<{ token: string }>>) => {
        try {
            const res = await http({
                url: '/user',
                method: 'GET',
            });

            if (data.account === res.data[0].account && data.password === res.data[0].password) {
                dispatch(setToken({ token: res.data[0].token }));
                return res.request;
            } else {
                return {
                    status: 401,
                };
            }
        } catch (error) {
            // 处理错误
            console.error('Failed to fetch token:', error);
            throw error;
        }
    };
};


export { setToken, fetchToken };
export default userReducer;
