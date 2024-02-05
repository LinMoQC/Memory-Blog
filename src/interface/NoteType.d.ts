export interface NoteType {
    key: string;
    cover: string;
    title: string;
    categories: string;
    tags: string[];
    isTop: boolean;
    time: Date;
    status: number
}