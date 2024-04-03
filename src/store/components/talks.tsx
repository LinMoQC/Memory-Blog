import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Talk} from "../../interface/TalkType";
import { Dispatch } from 'react';
import {getTalkList} from "../../apis/TalkMethods.tsx";

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
        getTalkList().then((res) => {
            dispatch(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export {setTalks,fetchTalks}
export default talksReducer