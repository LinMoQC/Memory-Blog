export interface Talk{
    talkKey: number;
    talkTitle: string,
    content: string,
    createTime: Date
    updateTime: Date
}

export interface updateTalk{
    content: string
    updateTime: string
    talkTitle: string
}