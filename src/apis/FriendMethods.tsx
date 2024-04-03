import http from "./axios.tsx";
import {Friend} from "../interface/FriendType";

function getFriendsList(){
    return http({
        url: '/api/public/friends',
        method: 'GET'
    })
}

function delFriends(keysToDelete:string[]){
    return  http({
        url: '/api/protected/friends',
        method: 'DELETE',
        data: keysToDelete
    })
}

function agreeFriends(key: number){
    return http({
        url: `/api/protected/friends/${key}`,
        method: 'POST'
    })
}

function refuseFriends(key:number){
    return http({
        url: `/api/protected/friends`,
        method: 'DELETE',
        data: [key]
    })
}

function applyFor(value:Friend){
    return  http({
        url: '/api/public/friends',
        method: 'POST',
        data: value
    })
}

export {getFriendsList,delFriends,agreeFriends,refuseFriends,applyFor}