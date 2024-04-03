import http from "./axios.tsx";
import React from "react";

interface newCategory{
    color: string
    introduce: string
    categoryTitle: string
    icon: string
    pathName: string
}

function getCategories(){
    return http({
        url: '/api/public/category',
        method: 'GET'
    })
}

function delCategory(key: number){
    return http({
        url: '/api/protected/category',
        method: 'DELETE',
        data: [key]
    })
}

function delAllCategory(selectedRowKeys: React.Key[]){
    return http({
        url: '/api/protected/category',
        method: 'DELETE',
        data: selectedRowKeys
    })
}

function addCategory(data: newCategory){
    return http({
            url: '/api/protected/category',
            method: 'POST',
            data: data
    })
}

function updateCategory(update: newCategory,isEdit: number){
    return http({
        url: `/api/protected/category/${isEdit}`,
        method: 'POST',
        data: update
    })
}

export {getCategories,delCategory,delAllCategory,addCategory,updateCategory}