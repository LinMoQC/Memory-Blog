export interface NoteType {
    noteCategory?: string;
    categoryTitle?: string;
    updateTime: Date;
    noteTitle: string;
    description: string;
    noteTags: number[];
    key: string;
    cover: string;
    categories: string;
    isTop: boolean | number;
    createTime: Date;
    status: string;
    content: string;
    noteKey: string
}

export interface formatNote {
    noteKey: number;
    noteTitle: string;
    noteContent: string;
    description: string;
    cover: string;
    noteCategory: string;
    noteTags: string;
    isTop: number;
    status: string;
    createTime: Date;
    updateTime: Date | string;
}