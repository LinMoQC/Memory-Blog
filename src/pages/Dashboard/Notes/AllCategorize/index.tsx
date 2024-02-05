import './index.sass'
import {
    Button, ColorPicker,
    Form,
    Input, message,
    Modal,
    Space,
    Table,
    TableProps,
    Tag,
} from "antd";
import React, {useState} from "react";
import {FolderOpenOutlined} from '@ant-design/icons';

interface CategorieType {
    key: string;
    categorie_title: string;
    introduce: string;
    icon: string;
    note_count: number;
    color: string;
}

const CategoriesData:CategorieType[] = [
    {
        key: '1',
        categorie_title: '技术',
        introduce: '关于编程、开发、技术趋势等的博客文章',
        icon: 'icon-code1',
        note_count: 2,
        color: '#3498db',
    },
    {
        key: '2',
        categorie_title: '设计',
        introduce: '设计原理、用户界面设计、用户体验等方面的博客文章',
        icon: 'icon-sheji1',
        note_count: 10,
        color: '#2ecc71',
    },
    {
        key: '3',
        categorie_title: '生活',
        introduce: '个人生活、日常琐事、旅行日记等的博客文章',
        icon: 'icon-icon',
        note_count: 12,
        color: '#e74c3c',
    },
    {
        key: '4',
        categorie_title: '健康',
        introduce: '健康生活、运动、饮食等方面的博客文章',
        icon: 'icon-jiankang',
        note_count: 21,
        color: '#f39c12',
    },
    {
        key: '5',
        categorie_title: '文学',
        introduce: '文学创作、书评、阅读感想等的博客文章',
        icon: 'icon-wenxue2',
        note_count: 7,
        color: '#9b59b6',
    },
    {
        key: '6',
        categorie_title: '学术',
        introduce: '学术研究、学科探讨等的博客文章',
        icon: 'icon-xueshuquan',
        note_count: 19,
        color: '#34495e',
    },
    {
        key: '7',
        categorie_title: '音乐',
        introduce: '音乐欣赏、乐器演奏、音乐创作等的博客文章',
        icon: 'icon-yinle',
        note_count: 4,
        color: '#e67e22',
    }
];


const  AllCategorize = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [staticDate,setStaticDate] = useState(CategoriesData)
    const [isEdit,setEdit] = useState('0')
    const [form] = Form.useForm();
    //删除逻辑
    const Delete = (key:number) => {
        setStaticDate(staticDate.filter(item => item.key!==key.toString()))
        message.success('删除成功')
    }

    const DeleteAll = () => {
        setStaticDate(staticDate.filter(item => !selectedRowKeys.includes(item.key)))
        setSelectedRowKeys([])
        message.success('删除成功')
    }

    //编辑逻辑
    const Change_Categorie = (value:CategorieType) => {
        setEdit(value.key)
        showModal()
        form.setFieldsValue({
            categorie: value.categorie_title,
            introduce: value.introduce,
            categorie_icon: value.icon,
            categorie_color: value.color
        });
    }

    //表单提交
    const onfinish = () => {
        // 获取整个表单的值
        const {categorie,introduce,categorie_icon,categorie_color} = form.getFieldsValue();
        const key = staticDate.length+1
        const date:CategorieType = {
            categorie_title: categorie,
            icon:categorie_icon,
            color:categorie_color.toHexString(),
            introduce:introduce,
            key: key.toString(),
            note_count: 0
        }
        console.log(date)
        setStaticDate([
            ...staticDate,
            date
        ])
    }

    const columns: TableProps<CategorieType>['columns'] = [
        {
          title: '序列',
          dataIndex: 'key',
          key: 'key',
          align: "center"
        },
        {
            title: '分类名称',
            dataIndex: 'categorie_title',
            key: 'key',
            align: "center",
        },
        {
            title: '分类介绍',
            dataIndex: 'introduce',
            key: 'title',
            align: "center"
        },
        {
            title: '分类图标',
            dataIndex: 'icon',
            key: 'key',
            align: "center",
            render: (icon) => <i className={`iconfont ${icon} icon`}></i>
        },
        {
            title: '文章数量',
            key: 'key',
            dataIndex: 'note_count',
            align: "center",
        },
        {
            title: '颜色',
            key: 'key',
            dataIndex: 'color',
            align: "center",
            render: (color) => <Tag color={color}>{color}</Tag>
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (item) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => Change_Categorie(item)}>编辑</Button>
                    <Button type='primary' style={{background: '#f5222d'}} onClick={() => Delete(item.key)}>删除</Button>
                </Space>
            ),
        },
    ];
    const listStyle: React.CSSProperties = {
        lineHeight: '200px',
        textAlign: 'center',
        background: 'white',
        borderRadius: '10px',
        marginTop: 10,
        maxWidth: '98%',
        height: '86%',
        marginLeft: '1%',
        overflowY: 'hidden'
    };
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

    //表单选中
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    //添加框打开
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        if (isEdit !== '0') {
            const updatedData = staticDate.map(item => {
                if (item.key === isEdit) {
                    return {
                        ...item,
                        categorie_title: form.getFieldsValue().categorie,
                        introduce: form.getFieldsValue().introduce,
                        icon: form.getFieldsValue().categorie_icon,
                        color: form.getFieldsValue().categorie_color
                    };
                } else {
                    return item;
                }
            });
            setStaticDate(updatedData);
            message.success('修改成功')
            setEdit('0');
            form.resetFields();
            setOpen(false);
        } else {
            form.validateFields().then(() => {
                setConfirmLoading(true);
                onfinish();
                message.success('发布成功');
                setConfirmLoading(false);
                form.resetFields();
                setOpen(false);
            });
        }
    };

    const handleCancel = () => {
        form.resetFields()
        setEdit('0')
        setOpen(false);
    };

    return <>
        <div style={listStyle} className="searchRes">
            <Table columns={columns} dataSource={staticDate} pagination={{pageSize: 8}}
                   title={() => <>
                           <div style={{float: 'left'}}>
                               <Button type="primary" style={{ background: '#389e0d'}} onClick={showModal}>
                                   新增
                               </Button>
                               <Button type="primary" style={{ marginLeft: 10,background: '#f5222d'}} onClick={DeleteAll}>
                                   批量删除
                               </Button>
                               <span style={{ marginLeft: 8 ,position: 'absolute',fontSize: 20,fontWeight: 600}}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
        </span>
                           </div>
                       <h2 style={{marginRight: 150}}>
                           <FolderOpenOutlined /> 分类管理
                       </h2>
                   </>}
                   rowSelection={rowSelection}
            />
        </div>

        <Modal
            title="分类新增"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={isEdit==='0'? '添加' : '保存'}
            cancelText='取消'
        >
            <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }} form={form} onFinish={onfinish}>
                <Form.Item label="分类名称" name="categorie" >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="分类介绍"
                    name="introduce"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }}/>
                </Form.Item>

                <Form.Item label="分类图标" name="categorie_icon"
                           rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="颜色" name="categorie_color" >
                    <ColorPicker defaultValue="#fff" showText format={'hex'}/>
                </Form.Item>
            </Form>
        </Modal>
    </>
}
export default  AllCategorize