import {TreeDataNode} from "antd";

type Color = {
    toHexString: () => string
}
export interface TagLevelOne extends TreeDataNode{
    key: number,
    color: string
    level: number
    title: string
    children: TagLevelTwo[]
}

//二级标签
export interface TagLevelTwo {
    key: number;
    level: number;
    title: string;
    color: string;
    fatherTag: string;
}

export interface newTag {
    level: string
    title: string;
    key: number;
    color: Color;
    children?: TagLevelTwo[]
    fatherTag?: number
}