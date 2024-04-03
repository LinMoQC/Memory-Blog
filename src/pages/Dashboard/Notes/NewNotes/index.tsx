import Editor_ from "../../../../components/Editor";
import './index.sass'
import {
    Button,
    Input,
    Form,
    Modal,
    Select,
    Upload, Switch, Radio, TreeSelect, ConfigProvider, UploadProps, UploadFile, GetProp, message,
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useEffect,  useState} from "react";
import dayjs from "dayjs";
import http from "../../../../apis/axios.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {fetchNoteList} from "../../../../store/components/note.tsx";
import generateResponse from "../../../../apis/chatgpt.tsx";
import {createNote, getNoteById, updateNote} from "../../../../apis/NoteMethods.tsx";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const NewNotes = () => {
    //hooks区域
    //文章提交表单
    const [open, setOpen] = useState(false);
    const [noteTitle,setTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [coverImg,setCoverImg] = useState('')
    const [aiContent,setAiContent] = useState('')
    const [noteTag, setNoteTag] = useState<number[]>();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const [form] = Form.useForm();
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)
    const categories = useSelector((state: {categories: any}) => state.categories.categories);


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    useEffect(() => {
        initNote()
    },[id])

    async function initNote(){
        if(id){
            try {
                const res = await getNoteById(id)
                form.setFieldsValue({
                    noteTitle: res.data.data.noteTitle,
                    noteCategory: res.data.data.noteCategory,
                    isTop: res.data.data.isTop,
                    status: res.data.data.status
                })
                setAiContent(res.data.data.description)
                setTitle(res.data.data.noteTitle)
                setNoteContent(res.data.data.noteContent)
                setNoteTag(res.data.data.noteTags.split(',').map((tag: string) => parseInt(tag, 10)))
            }catch (error){
                message.error("获取出错")
            }
        }
    }


    //回调函数区域
    const getAiContent = async () => {
        const openai = await generateResponse(noteContent)
        setAiContent(openai)
    }

    const upload = async (file: UploadFile) => {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', file);
        const response = await http({
            url: '/api/protect/upload',
            method: 'POST',
            data: formData
        });

        if(response.status ===200){
            setCoverImg(response.data.data)
        }

    }

    const showModal = async () => {
        setOpen(true);
        form.setFieldsValue({noteTitle: noteTitle});
    };

    const handleOk = () => {
        setConfirmLoading(true);
            onFinsh()
            setOpen(false);
            setConfirmLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onFinsh = async () => {
        const formValues = form.getFieldsValue();

        if (id) {
            const data = {
                noteTitle: formValues.noteTitle,
                noteContent: noteContent,
                cover: coverImg,
                description: aiContent,
                noteCategory: formValues.noteCategory,
                // @ts-ignore
                noteTags: noteTag.toString(),
                isTop: Number(formValues.isTop),
                status: formValues.status,
                updateTime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
            }
            try {
                const res = await updateNote(id, data)
                if(res.status === 200){
                    dispatch<any>(fetchNoteList())
                    message.success("文章更新成功")
                    navigate('/dashboard/notes')
                }
            } catch (error) {
                message.error("文章更新失败：" + error)
                navigate('/dashboard/notes')
            }
        } else {
            const data = {
                noteTitle: formValues.noteTitle,
                noteContent: noteContent,
                cover: coverImg,
                description: aiContent,
                noteCategory: formValues.noteCategory,
                // @ts-ignore
                noteTags: noteTag.toString(),
                isTop: Number(formValues.isTop),
                status: formValues.status,
                createTime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                updateTime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
            }
            try {
                const res = await createNote(data)
                if (res.status === 200) {
                    dispatch<any>(fetchNoteList())
                    message.success("文章创建成功")
                }
            }catch (error){
                message.error("文章创建失败：")
            }
        }

        //     清除
        setNoteContent(' ')
        setTitle(' ')
        setNoteTag([])
        setNoteContent('')
        form.resetFields()
    }
    const onChange = (newTag: number[]) => {
        setNoteTag(newTag);
    };

    return <>
        <div className="notes-container">
            <div className="article_title">
                <label style={{width:115,fontSize:18,fontWeight:600}}>文章标题</label>
                <Input style={{background: 'transparent',border: '1px solid #4096ff',width: '95%',marginRight: 10}} onChange={handleInputChange} value={noteTitle}/>

                <Button type="primary" onClick={showModal} style={{float: "right"}}>
                    提交
                </Button>
            </div>
            <div className="new_article">
                <Editor_  setNoteContent={setNoteContent} noteContent={noteContent}/>
            </div>

            {/*文章创建*/}
            <Modal
                title="发布文章"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="发布"
                cancelText="返回"
            >

                <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }} form={form} onFinish={onFinsh}>
                    <Form.Item label="文章标题" name="noteTitle" >
                        <Input  disabled={true} value={noteTitle}/>
                    </Form.Item>

                    <Form.Item
                        label="文章描述"
                        name="description"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} value={aiContent} onChange={(v) => setAiContent(v.target.value)}/>
                        <i className="iconfont icon-openai" style={{fontSize: 16,color:'#939ad8',position:'absolute',bottom:5,right: 5,cursor:'pointer'}} onClick={getAiContent}></i>
                    </Form.Item>


                    <Form.Item label="文章分类" name="noteCategory" rules={[{ required: true, message: 'Please input!'}]}>
                        <Select>
                            {categories.map((item: { categoryTitle: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                <Select.Option value={item.categoryTitle}>{item.categoryTitle}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="文章标签"
                        name="noteTags"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <ConfigProvider
                            theme={{
                                components: {
                                    TreeSelect: {
                                    },
                                },
                            }}
                        >
                            <TreeSelect
                                placeholder="请选择文章标签"
                                showSearch
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                treeData={tagList.map((tag: { tagKey: number; children: { tagKey: number; }[]; }) => ({
                                    ...tag,
                                    value: tag.tagKey,
                                    key: tag.tagKey,
                                    children: tag.children ? tag.children.map((child: { tagKey: number; }) => ({
                                        ...child,
                                        value: child.tagKey,
                                        key: child.tagKey
                                    })) : [] // 确保即使没有子节点也保留空数组
                                }))}
                                onChange={onChange}
                                value={noteTag}
                            />
                        </ConfigProvider>
                    </Form.Item>

                    <Form.Item label="文章封面" name="cover" valuePropName="fileList" getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e.slice(-1);
                        }
                        return e && e.fileList.slice(-1);
                    }} rules={[{ required: true, message: 'Please input!' }]}>
                        {/*@ts-ignore*/}
                        <Upload action={upload} listType="picture-card" fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}>
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="置顶" name='isTop' valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="status" label="文章状态" rules={[{ required: true, message: 'Please input!' }]}>
                        <Radio.Group>
                            <Radio value="public">公开</Radio>
                            <Radio value="private">私密</Radio>
                            <Radio value="draft">草稿</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </>
}

export default NewNotes