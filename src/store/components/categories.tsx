import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import {CategoriesType} from "../../interface/CategoriesType";
import {getCategories} from "../../apis/CategoryMethods.tsx";
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
        try {
            const res = await getCategories()
            dispatch(setCategories(res.data.data))
            dispatch(setCategoryCount(res.data.data.length))
        }catch (error) {
            console.log(error)
        }
    }
}

const {setCategories,setCategoryCount} = categoriesSlice.actions
const categoriesReducer = categoriesSlice.reducer


export {setCategories, fetchCategories};
export type { categoryList };
export default categoriesReducer