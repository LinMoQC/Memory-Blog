import gfm from '@bytemd/plugin-gfm'
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import { Editor} from '@bytemd/react'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import 'bytemd/dist/index.css'
import zhCN from 'bytemd/locales/zh_Hans.json'
import 'github-markdown-css/github-markdown-dark.css'
import './index.css'
import http from "../../apis/axios.tsx";
import {message} from "antd";

const plugins = [
    gfm(),
    breaks(),
    frontmatter(),
    gemoji(),
    highlight(),
    mediumZoom()
]

interface Editor_Props {
    setNoteContent: (content: string) => void,
    noteContent: string
}


const Editor_ = ({ setNoteContent, noteContent }: Editor_Props) => {

    // @ts-ignore
    const handleImageUpload = async (files: File[]): Promise<Pick<Image, "alt" | "url" | "title">[]> => {
        try {
            const formData = new FormData();
            formData.append('file', files[0]);
            const response = await http({
                url: '/api/protect/upload',
                method: 'POST',
                data: formData
            });

            if (response.status === 200) {
                message.success("添加成功");
                const imageURL = response.data.data;
                // @ts-ignore
                const img: Pick<Image, "alt" | "url" | "title"> = {
                    alt: '',
                    url: imageURL,
                    title: ''
                };
                return [img];
            } else {
                message.error("添加失败");
                return [];
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            throw error;
        }
    };




    return (
        <div className='markdown-body"'>
            <Editor
                value={noteContent}
                plugins={plugins}
                locale={zhCN}
                onChange={(v) => {
                    setNoteContent(v)
                }}
                uploadImages={(e) => handleImageUpload(e)}
            />

        </div>
    )
}

export default Editor_