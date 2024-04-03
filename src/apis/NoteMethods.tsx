import http from "./axios.tsx";
import React from "react";
interface status{
    isTop: number
    status: string
    updateTime: string
}

interface updateNote{
    noteTitle: any;
    noteContent: string;
    cover: string;
    description: string;
    noteCategory: any;
    noteTags: string;
    isTop: number;
    status: any;
    updateTime: string;
}

interface newNote{
    noteTitle: any;
    noteContent: string;
    cover: string;
    description: string;
    noteCategory: any;
    noteTags: string;
    isTop: number;
    status: any;
    createTime: string;
    updateTime: string;
}

function getNotes(){
    return http({
        url: '/api/public/notes',
        method: 'GET'
    })
}

function delNote(key: number){
    return http({
        url: '/api/protected/notes',
        method: 'DELETE',
        data: [key]
    })
}

function delAllNotes(selectedRowKeys: React.Key[]){
    return http({
        url: '/api/protected/notes',
        method: 'DELETE',
        data: selectedRowKeys
    })
}

function updateNoteStatus(data: status,isEdit:string){
    return http({
        url: `/api/protected/notes/${isEdit}`,
        method: 'POST',
        data: data
    })
}

function getNoteById(id: string){
    return http({
        url: `/api/public/notes/${id}`,
        method: 'GET'
    })
}

function updateNote(id:string,update: updateNote){
    return http({
        url: `/api/protected/notes/${id}`,
        method: 'POST',
        data: update
    })
}

function createNote(data: newNote){
    return http({
        url: '/api/protected/notes',
        method: 'POST',
        data: data
    })
}

function searchNotes(data:any){
    return http({
        url: '/api/public/notes/search',
        method: 'POST',
        params: data
    })
}

interface page{
    page: number
    pageSize: number
}
function getNotePage(data?:page){
    return http({
        url: '/api/public/notes/page',
        method: 'GET',
        params: data
    })
}

function getTopNotes(){
    return http({
        url: '/api/public/topnotes',
        method: 'GET',
    })
}

export {getNotes,delNote,delAllNotes,updateNoteStatus,getNoteById,updateNote,createNote,searchNotes,getNotePage,getTopNotes}