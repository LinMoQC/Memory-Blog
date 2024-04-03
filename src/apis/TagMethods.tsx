import http from "./axios.tsx";
import {TagLevelOne, TagLevelTwo} from "../interface/TagType";
import React from "react";
import {Tag} from "antd";
interface addNewTagOne{
    title: string,
    color: string,
}
interface addNewTagTwo{
    title: string,
    color: string,
    tagKey: number,
    fatherTag: string
}
// 获取一级标签
async function getTagOne() {
    try {
        const response = await http({
            url: '/api/public/tagone',
            method: 'GET'
        });
        return response.data.data.map((item: { tagKey: number; title: string; level: number; color: string; }) => ({
            key: item.tagKey,
            title: item.title,
            level: item.level,
            color: item.color,
            children: []
        }));
    } catch (error) {
        console.error("Error fetching tag one data:", error);
        return [];
    }
}
// 新增一级标签
function addTagOne(newTag: addNewTagOne){
    return http({
        url: '/api/protected/tagone',
        method: 'POST',
        data: newTag
    })
}
// 获取二级标签
async function getTagTwo() {
    try {
        const response = await http({
            url: '/api/public/tagtwo',
            method: 'GET'
        });
        return response.data.data.map((item: { tagKey: number; title: string; level: number; color: string; fatherTag: string }) => ({
            key: item.tagKey,
            title: item.title,
            level: item.level,
            color: item.color,
            fatherTag: item.fatherTag
        }));
    } catch (error) {
        console.error("Error fetching tag two data:", error);
        return []; // or handle error as needed
    }
}
// 新增二级标签
async function addTagTwo(newTag: addNewTagTwo){
    return http({
        url: '/api/protected/tagtwo',
        method: 'POST',
        data: newTag
    })
}
// 建立标签嵌套树
function buildTagTree(tagOneData: TagLevelOne[],tagTwoData: TagLevelTwo[]){
    return tagOneData.map(item => {
        item.children = tagTwoData.filter(child => child.fatherTag === item.title);
        return item;
    });
}
// 初始化树
async function initTree(){
    const tagOneData: TagLevelOne[] = await getTagOne();
    const tagTwoData: TagLevelTwo[] = await getTagTwo();
    return buildTagTree(tagOneData,tagTwoData)
}
// 删除标签
function delTag(selectedKeys: React.Key[]) {
    return http({
        url: '/api/protected/tag',
        method: 'DELETE',
        data: selectedKeys
    })
}

function renderNoteTags(noteTags: number[],tagList: any){
    return noteTags.map(noteTag => {
        let color;
        let name;
        tagList.forEach((tag: { tagKey: number; color: string; title: string; children: any[]; }) => {
            if (tag.tagKey === noteTag) {
                color = tag.color;
                name = tag.title;
            } else if (tag.children && tag.children.some(child => child.tagKey === noteTag)) {
                color = tag.color;
                name = tag.children.find(child => child.tagKey === noteTag).title;
            }
        });

        return (
            <Tag color={color} key={noteTag} style={{margin:5}}>
                {name}
            </Tag>
        );
    })
}

export {getTagOne,getTagTwo,buildTagTree,delTag,initTree,addTagOne,addTagTwo,renderNoteTags}
