import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';
import {TagLevelOne, TagLevelTwo} from "../../interface/TagType";


interface Tag {
    tag: TagLevelOne[],
    tagCount: number
}

const init: Tag = {
    tag: [],
    tagCount: 0
}


const tagSlice = createSlice({
    name: "tags",
    initialState: init,
    reducers: {
        setTags: (state,action:PayloadAction<TagLevelOne[]>) => {
            state.tag = action.payload
        },
        setTagCount: (state,action) => {
            state.tagCount = action.payload
        }
    }
})

const fetchTags = () => {
    return async (dispatch:Dispatch<PayloadAction<TagLevelOne[]>>) => {
        const tagone = await http({
            url: '/api/public/tagone',
            method: 'GET'
        }).then((res) => {
            return res.data.data
        });
        const tagtwo = await http({
            url: '/api/public/tagtwo',
            method: 'GET'
        }).then((res) => {
            return res.data.data
        });

        const tree = tagone.map((item: { children: TagLevelTwo[]; title: string; }) => {
            item.children = tagtwo.filter((child: { fatherTag: string; }) => child.fatherTag === item.title);
            return item;
        });

        const tagCount = tagone.length + tagtwo.length

        dispatch(setTagCount(tagCount))
        dispatch(setTags(tree))

    }
}

const {setTags,setTagCount} = tagSlice.actions
const tagReducer = tagSlice.reducer


export {setTags,fetchTags}
export default tagReducer