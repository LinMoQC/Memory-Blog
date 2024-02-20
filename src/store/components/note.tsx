import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';
import {NoteType} from "../../interface/NoteType";


interface noteList {
    Notes: NoteType[],
    noteCount: number
}

const init: noteList = {
    Notes: [],
    noteCount: 0
}


const NoteSlice = createSlice({
    name: "Note",
    initialState: init,
    reducers: {
        setNote: (state,action:PayloadAction<NoteType[]>) => {
            state.Notes = action.payload
        },
        setNoteCount: (state,action) => {
            state.noteCount = action.payload
        }
    }
})

const fetchNoteList = () => {
    return async (dispatch: Dispatch<PayloadAction<NoteType[]>>) => {
        try {
            const res = await http({
                url: '/api/protected/notes',
                method: 'GET'
            });

            // 处理响应数据，将 noteTags 转换为数组
            const processedData = res.data.data.map((item: { noteTags: string; }) => ({
                ...item,
                noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
            }));

            // 将处理后的数据存入 Redux store 中
            dispatch(setNote(processedData));
            dispatch(setNoteCount(processedData.length));
        } catch (err) {
            // 处理错误
            console.error('Error fetching note list:', err);
        }
    };
}

const {setNote,setNoteCount} = NoteSlice.actions
const NoteReducer = NoteSlice.reducer


export {setNote, fetchNoteList};
export type { noteList };
export default NoteReducer