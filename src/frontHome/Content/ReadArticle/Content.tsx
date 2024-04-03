import React from "react";
interface Content{
    content: string | undefined
}
const Content:React.FC<Content>= ({content}) => {
    return <article dangerouslySetInnerHTML={{ __html: content || '' }}/>
}
export default Content