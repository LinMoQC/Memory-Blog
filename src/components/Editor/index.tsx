import gfm from '@bytemd/plugin-gfm'
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import { Editor} from '@bytemd/react'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import 'bytemd/dist/index.css'
import {useState} from "react";
import zhCN from 'bytemd/locales/zh_Hans.json'
import 'github-markdown-css/github-markdown-dark.css'
import './index.css'

const plugins = [
    gfm(),
    breaks(),
    frontmatter(),
    gemoji(),
    highlight(),
    mediumZoom()
]

const Editor_ = () => {
    const [value, setValue] = useState('')
    const handleImageUpload = async (file) => {
        try {
            // Implement your image upload logic here, for example using FormData and fetch
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('your-upload-api-endpoint', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imageURL = await response.json();
                console.log('Upload successful. Image URL:', imageURL);
            } else {
                console.error('Upload failed.');
            }
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    };
    return (
        <div className='markdown-body"'>
            <Editor
                value={value}
                plugins={plugins}
                locale={zhCN}
                onChange={(v) => {
                    setValue(v)
                }}
                uploadImages={(e) => handleImageUpload(e)}
            />

        </div>
    )
}

export default Editor_