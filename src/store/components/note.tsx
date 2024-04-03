import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import {NoteType} from "../../interface/NoteType";
import {getNotes} from "../../apis/NoteMethods.tsx";


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
            const res = await getNotes()
            const processedData = res.data.data.map((item: { noteTags: string; }) => ({
                ...item,
                noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
            }));
            dispatch(setNote(processedData));
            dispatch(setNoteCount(processedData.length));
        } catch (err) {
            console.error('Error fetching note list:' + err);
        }
    };
}

const {setNote,setNoteCount} = NoteSlice.actions
const NoteReducer = NoteSlice.reducer


export {setNote, fetchNoteList};
export type { noteList };
export default NoteReducer