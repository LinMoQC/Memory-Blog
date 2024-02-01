import Editor_ from "../../../../components/Editor";
import './index.sass'
import {
    Button,
    Input,
    Form,
    Modal,
    Select,
    Upload, Switch, Radio, TreeSelect, ConfigProvider,
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";

const NewNotes = () => {
    //文章提交表单
    const [open, setOpen] = useState(false);
    const [title_vlaue,setTitle] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
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


    const categorize = [
        {
            id: 1,
            name: '技术',
            description: '关于编程、开发、技术趋势等的博客文章',
        },
        {
            id: 2,
            name: '设计',
            description: '设计原理、用户界面设计、用户体验等方面的博客文章',
        },
        {
            id: 3,
            name: '生活',
            description: '个人生活、日常琐事、旅行日记等的博客文章',
        },
        {
            id: 4,
            name: '健康',
            description: '健康生活、运动、饮食等方面的博客文章',
        },
        {
            id: 5,
            name: '文学',
            description: '文学创作、书评、阅读感想等的博客文章',
        },
        {
            id: 6,
            name: '学术',
            description: '学术研究、学科探讨等的博客文章',
        },
        {
            id: 7,
            name: '音乐',
            description: '音乐欣赏、乐器演奏、音乐创作等的博客文章',
        },
        // 添加更多分类...
    ];

    const tags = [
        {
            id: 1,
            value: '前端开发',
            title: '前端开发',
            children: [
                {
                    id: 101,
                    value: 'React',
                    title: 'React',
                },
                {
                    id: 102,
                    value: 'Vue.js',
                    title: 'Vue.js',
                },
                {
                    id: 103,
                    value: 'Angular',
                    title: 'Angular',
                },
            ],
        },
        {
            id: 2,
            value: '后端开发',
            title: '后端开发',
            children: [
                {
                    id: 201,
                    value: 'Node.js',
                    title: 'Node.js',
                },
                {
                    id: 202,
                    value: 'Django',
                    title: 'Django',
                },
                {
                    id: 203,
                    value: 'Spring Boot',
                    title: 'Spring Boot',
                },
            ],
        },
        {
            id: 3,
            value: '移动端开发',
            title: '移动端开发',
            children: [
                {
                    id: 301,
                    value: 'React Native',
                    title: 'React Native',
                },
                {
                    id: 302,
                    value: 'Flutter',
                    title: 'Flutter',
                },
                {
                    id: 303,
                    value: 'Swift',
                    title: 'Swift',
                },
            ],
        },
        {
            id: 4,
            value: '数据科学',
            title: '数据科学',
            children: [
                {
                    id: 401,
                    value: '机器学习',
                    title: '机器学习',
                },
                {
                    id: 402,
                    value: '数据分析',
                    title: '数据分析',
                },
                {
                    id: 403,
                    value: '人工智能',
                    title: '人工智能',
                },
            ],
        },
        // 添加更多一级标签和二级标签...
    ];

    const showModal = () => {
        setOpen(true);
        form.setFieldsValue({ Input: title_vlaue });
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };

    // const onPreview = async (file: UploadFile) => {
    //     let src = file.url as string;
    //     if (!src) {
    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj as FileType);
    //             reader.onload = () => resolve(reader.result as string);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return <>
        <div className="notes-container">
            <div className="article_title">
                <label style={{width:115,fontSize:18,fontWeight:600}}>文章标题</label>
                <Input style={{background: 'transparent',border: '1px solid #4096ff',width: '95%',marginRight: 10}} onChange={handleInputChange}/>

                <Button type="primary" onClick={showModal} style={{float: "right"}}>
                    提交
                </Button>
            </div>
            <div className="new_article">
                <Editor_ />
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

                <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }} form={form}>
                    <Form.Item label="文章标题" name="Input" >
                        <Input  disabled={true} value={title_vlaue}/>
                    </Form.Item>

                    <Form.Item
                        label="文章描述"
                        name="TextArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }}/>
                    </Form.Item>


                    <Form.Item label="文章分类" name="Select" rules={[{ required: true, message: 'Please input!'}]}>
                        <Select>
                            {categorize.map((item) => (
                                <Select.Option value={item.name}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="文章标签"
                        name="Cascader"
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
                                showSearch
                                style={{ width: '100%' }}
                                // value={value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                treeData={tags}
                            />
                        </ConfigProvider>
                    </Form.Item>

                    <Form.Item label="文章封面" name="avatar" valuePropName="fileList" getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e.slice(-1); // 返回数组中的最后一个元素，即上传的最后一个文件
                        }
                        return e && e.fileList.slice(-1);
                    }} rules={[{ required: true, message: 'Please input!' }]}>
                        <Upload action="/upload.do" listType="picture-card">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="置顶" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="article_status" label="文章状态" rules={[{ required: true, message: 'Please input!' }]}>
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