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
                url: '/api/login',
                method: 'POST',
                data: data
            });

            const token = res.data.token;
            dispatch(setToken({ token: token}));
            return res.status;
        } catch (error) {
            // 处理错误
            console.error('Failed to fetch token:', error);
            throw error;
        }
    };
};


export { setToken, fetchToken };
export default userReducer;
