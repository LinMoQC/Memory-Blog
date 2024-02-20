import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import {Talk} from "../../interface/TalkType";
import { Dispatch } from 'react';

const talkSlice = createSlice({
    name: "talks",
    initialState: {
        talks: []
    },
    reducers: {
        setTalks: (state,action:PayloadAction<[]>) => {
            state.talks = action.payload
        }
    }
})

const {setTalks} = talkSlice.actions
const talksReducer = talkSlice.reducer

const fetchTalks = () => {
    return async (dispatch:Dispatch<PayloadAction<Talk>>) => {
        http({
            url: '/api/protect/talk',
            method: "GET"
        }).then((res) => {
            console.log(res.data.data)
            dispatch(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export {setTalks,fetchTalks}
export default talksReducer