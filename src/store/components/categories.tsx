import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '../../apis/axios.tsx';
import { Dispatch } from 'react';
import {CategoriesType} from "../../interface/CategoriesType";


interface categoryList {
    categories: CategoriesType[],
    categoryCount: number
}

const init: categoryList = {
    categories: [],
    categoryCount: 0
}


const categoriesSlice = createSlice({
    name: "categories",
    initialState: init,
    reducers: {
        setCategories: (state,action:PayloadAction<CategoriesType[]>) => {
            state.categories = action.payload
        },
        setCategoryCount: (state,action) => {
            state.categoryCount = action.payload
        }
    }
})

const fetchCategories = () => {
    return async (dispatch:Dispatch<PayloadAction<CategoriesType[]>>) => {
        http({
            url: '/api/protected/category',
            method: 'GET'
        }).then((res) => {
            dispatch(setCategories(res.data.data))
            dispatch(setCategoryCount(res.data.data.length))
        }).catch((err)=>{
            console.log(err)
        })
    }
}

const {setCategories,setCategoryCount} = categoriesSlice.actions
const categoriesReducer = categoriesSlice.reducer


export {setCategories,fetchCategories}
export default categoriesReducer