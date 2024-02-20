import {ReactNode} from "react";

export interface NoteType {
    updateTime: Date;
    noteTitle: string;
    description: string;
    noteTags: number[];
    key: string;
    cover: string;
    categories: string;
    isTop: boolean;
    createTime: Date;
    status: string;
    content: string;
}