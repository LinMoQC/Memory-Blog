import {TreeDataNode} from "antd";

type Color = {
    toHexString: () => string
}
export interface myTreeNode extends TreeDataNode{
    color: string
    children?: myFieldDataNode[]
}

export interface myFieldDataNode {
    title: string;
    color: string;
    key: string;
}

export interface newTag {
    level?: string
    title: string;
    key: string;
    color: Color;
    children?: myFieldDataNode[]
    parentTag?: string
}