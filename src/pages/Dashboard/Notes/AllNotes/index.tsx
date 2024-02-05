import './index.sass'
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input, message,
    Modal,
    Radio,
    Row,
    Select,
    Space, Tabs,
    theme,
    TreeSelect
} from 'antd';
import { DatePicker} from 'antd';
import React, {useState} from "react";
import zhCN from "antd/lib/locale/zh_CN";
import {useNavigate} from "react-router-dom";
import { Table, Tag } from 'antd';
import type { TableProps, TabsProps } from 'antd';
import {NoteType} from "../../../../interface/NoteType";
import {CategoriesType} from "../../../../interface/CategoriesType";
import {myTreeNode} from "../../../../interface/TagType";
//图片引入
import img1 from '../../../../assets/formImg/img.webp'
import img2 from '../../../../assets/formImg/img1.webp'
import img3 from '../../../../assets/formImg/img2.jpg'
import img4 from '../../../../assets/formImg/img4.jpg'

// interface NoteType {
//     key: string;
//     cover: string;
//     title: string;
//     categories: string;
//     tags: string[];
//     isTop: boolean;
//     time: Date;
//     status: number
// }

const tags:myTreeNode[] = [
    {
        title: '前端开发',
        key: '1',
        color: 'geekblue',
        children: [
            {
                title: 'React',
                key: '101',
                color: 'geekblue',
            },
            {
                title: 'Vue.js',
                key: '102',
                color: 'geekblue',
            },
            {
                title: 'Angular',
                key: '103',
                color: 'geekblue',
            },
        ],
    },
    {
        title: '后端开发',
        color: 'lime',
        key: '2',
        children: [
            {
                title: 'Node.js',
                key: '201',
                color: 'lime',
            },
            {
                title: 'Django',
                key: '202',
                color: 'lime',
            },
            {
                title: 'Spring Boot',
                key: '203',
                color: 'lime',
            },
        ],
    },
    {
        title: '移动端开发',
        color: 'gold',
        key: '3',
        children: [
            {
                title: 'React Native',
                key: '301',
                color: 'gold',
            },
            {
                title: 'Flutter',
                key: '302',
                color: 'gold',
            },
            {
                title: 'Swift',
                key: '303',
                color: 'gold',
            },
        ],
    },
    {
        title: '数据科学',
        key: '4',
        color: 'cyan',
        children: [
            {
                title: '机器学习',
                key: '401',
                color: 'cyan',
            },
            {
                title: '数据分析',
                key: '402',
                color: 'cyan',
            },
            {
                title: '人工智能',
                key: '403',
                color: 'cyan',
            },
        ],
    },
];

const categoriesDate:CategoriesType[] = [
    {
        key: '1',
        categories_title: '技术',
        introduce: '关于编程、开发、技术趋势等的博客文章',
        icon: 'icon-code1',
        note_count: 2,
        color: '#3498db',
    },
    {
        key: '2',
        categories_title: '设计',
        introduce: '设计原理、用户界面设计、用户体验等方面的博客文章',
        icon: 'icon-sheji1',
        note_count: 10,
        color: '#2ecc71',
    },
    {
        key: '3',
        categories_title: '生活',
        introduce: '个人生活、日常琐事、旅行日记等的博客文章',
        icon: 'icon-icon',
        note_count: 12,
        color: '#e74c3c',
    },
    {
        key: '4',
        categories_title: '健康',
        introduce: '健康生活、运动、饮食等方面的博客文章',
        icon: 'icon-jiankang',
        note_count: 21,
        color: '#f39c12',
    },
    {
        key: '5',
        categories_title: '文学',
        introduce: '文学创作、书评、阅读感想等的博客文章',
        icon: 'icon-wenxue2',
        note_count: 7,
        color: '#9b59b6',
    },
    {
        key: '6',
        categories_title: '学术',
        introduce: '学术研究、学科探讨等的博客文章',
        icon: 'icon-xueshuquan',
        note_count: 19,
        color: '#34495e',
    },
    {
        key: '7',
        categories_title: '音乐',
        introduce: '音乐欣赏、乐器演奏、音乐创作等的博客文章',
        icon: 'icon-yinle',
        note_count: 4,
        color: '#e67e22',
    }
];

let Notesdata: NoteType[] = [
    {
        key: '1',
        cover: img1,
        title: '深入理解神经网络',
        categories: '技术',
        tags: ["数据分析", "机器学习", "人工智能"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 1
    },
    {
        key: '2',
        cover: img2,
        title: '构建高性能的Web应用',
        categories: '设计',
        tags: ["React", "Vue.js", "React Native"],
        isTop: false,
        time: new Date('2022-02-15'),
        status: 2
    },
    {
        key: '3',
        cover: img3,
        title: "掌握数据结构与算法",
        categories: '技术',
        tags: ["Flutter", "Django", "Node.js"],
        isTop: true,
        time: new Date('2022-03-20'),
        status: 2
    },
    {
        key: '4',
        cover: img4,
        title: '容器化应用与Docker"',
        categories: '文学',
        tags: ["Docker", "Vue.js", "DevOps"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 1
    },
    {
        key: '5',
        cover: img3,
        title: "掌握数据结构与算法",
        categories: '学术',
        tags: ["数据结构", "算法", "编程"],
        isTop: true,
        time: new Date('2022-03-20'),
        status: 3
    },
    {
        key: '6',
        cover: img4,
        title: '容器化应用与Docker"',
        categories: '技术',
        tags: ["Docker", "容器化", "DevOps"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 3
    },
];

const AdvancedSearchForm = () => {
    //hooks区域
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [form] = Form.useForm();


    //回调函数区域
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    //表单样式
    const formStyle: React.CSSProperties = {
        maxWidth: '98%',
        borderRadius: token.borderRadiusLG,
        padding: 24,
        margin: 'auto',
        background: 'white',
        height: '140px'
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        name='title'
                        label='文章标题'
                    >
                        <Input placeholder="请输入文章标题" />
                    </Form.Item>
                    <Form.Item
                        name='top'
                        label='是否置顶'
                    >
                        <Select placeholder="请选择是否置顶" options={[
                            { value: 'true', label: '是' },
                            { value: 'false', label: '否' },
                        ]}>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name='categories'
                        label='文章分类'
                    >
                        <Select placeholder="请选择文章分类">
                            {categoriesDate.map(category => (
                                <Select.Option key={category.key} value={category.categories_title}>
                                    {category.categories_title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='time'
                        label='发布时间'
                    >

                        <ConfigProvider locale={zhCN}>
                            <RangePicker />
                        </ConfigProvider>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name='tagsLab'
                        label='文章标签'
                    >
                        <TreeSelect
                            placeholder="请选择文章标签"
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            treeData={tags.map(tag => ({
                                ...tag,
                                value: tag.key
                            }))}
                        />
                    </Form.Item>
                    <div style={{ textAlign: 'right' }}>
                        <Space size="small">
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                重置
                            </Button>
                        </Space>
                    </div>
                </Col>
            </Row>


        </Form>
    );
};

const AllNotes = () => {
    const { token } = theme.useToken();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate()
    const [staticDate,setStaticDate] = useState(Notesdata)
    const [open, setOpen] = useState(false);
    const [isEdit,setEdit] = useState('')
    const [form] = Form.useForm();

    const listStyle: React.CSSProperties = {
        lineHeight: '200px',
        textAlign: 'center',
        background: 'white',
        borderRadius: token.borderRadiusLG,
        marginTop: 16,
        maxWidth: '98%',
        height: '460px',
        marginLeft: '1%',
        overflowY: 'auto'
    };

    const DeleteNote = (key:string) => {
        setStaticDate(staticDate.filter(item => item.key!== key))
        message.success('删除成功')
    }

    const showModal = (value:NoteType) => {
        setOpen(true)
        setEdit(value.key)
    }

    const onOk = () => {
        const updatedData = Notesdata.map(item => {
            if (item.key === isEdit) {
                return {
                    ...item,
                    status: parseInt(form.getFieldsValue().status)
                };
            } else {
                return item;
            }
        });
        Notesdata = updatedData
        setStaticDate(updatedData);
        message.success('状态变更成功')
        setEdit('0');
        form.resetFields();
        setOpen(false)
    }

    const onCancel = () => {
        setOpen(false)
    }

    const onfinish = () => {

    }


    const columns: TableProps<NoteType>['columns'] = [
        {
            title: '封面缩略图',
            dataIndex: 'cover',
            key: 'cover',
            align: "center",
            render: (cover) => <img src={cover} alt="封面缩略图" style={{ maxWidth: '100px',borderRadius: 5}} />
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: "center"
        },
        {
            title: '文章分类',
            dataIndex: 'categories',
            key: 'categories',
            align: "center",
            render: (item) => (
                <>
                    {categoriesDate
                        .filter(category => category.categories_title === item)
                        .map(category => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Tag color={category.color} key={category.key}>
                                    <i className={`iconfont ${category.icon}`} style={{ display: 'inline', fontSize: 20,marginTop:1 }}></i>
                                    <span style={{ fontSize: 16 ,marginBottom:1,marginLeft:3}}>{category.categories_title}</span>
                                </Tag>
                            </div>

                        ))
                    }
                </>
            )
        },
        {
            title: '文章标签',
            key: 'tags',
            dataIndex: 'tags',
            align: "center",
            render: (_, record) => (
                <>
                    {record.tags.map((tag) => {
                        let color = 'green'; // 默认颜色

                        // 遍历所有分类项
                        tags.forEach((category) => {
                            // 如果标签存在于当前分类项中，则将颜色设置为当前分类项的颜色
                            if (category.title === tag) {
                                color = category.color;
                            } else if (category.children && category.children.some(child => child.title === tag)) {
                                color = category.color;
                            }
                        });

                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            )

        },
        {
            title: '是否置顶',
            key: 'isTop',
            dataIndex: 'isTop',
            align: "center",
            render: (isTop) => (isTop ? '是' : '否'),
        },
        {
            title: '发布时间',
            key: 'time',
            dataIndex: 'time',
            align: "center",
            render: (time) => new Date(time).toLocaleString(),
        },
        {
            title: '文章状态',
            key: 'status',
            dataIndex: 'status',
            align: "center",
            render: (status) => (status === 1 ?  <i className={`iconfont icon-public1`}></i> : status === 2 ? <i className={`iconfont icon-private4`}></i>: status === 3 ? <i className={`iconfont icon-caogaoxiang1`}></i>: '未知状态'),
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (item) => (
                <Space size="middle">
                    <Button type='primary'>编辑</Button>
                    <Button type='primary' style={{background: '#f5222d'}} onClick={() => DeleteNote(item.key)}>删除</Button>
                    <Button type='primary' style={{background: '#13c2c2'}} onClick={() => showModal(item)}>状态变更</Button>
                </Space>
            ),
        },
    ];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const items: TabsProps['items'] = [
        {
            label: '全部文章',
            key: '1',
        },
        {
            label: '私密文章',
            key: '2',
        },
        {
            label: '草稿箱',
            key: '3',
        },
    ];


    const onChange = (value:string) => {
        if (parseInt(value) === 1){
            setStaticDate(Notesdata)
        }else if (parseInt(value) === 2){
            setStaticDate(Notesdata.filter(item => item.status===2))
        }else {
            setStaticDate(Notesdata.filter(item => item.status=== 3))
        }
    }
    return <>
            <div className="AllCard">
                <AdvancedSearchForm />
                <Button type="primary" style={{marginLeft:15,marginTop:15,background: '#389e0d'}} onClick={() => navigate('newnote')}>新增</Button>
                <Button type="primary" style={{marginLeft:15,marginTop:15,background: '#f5222d'}}>批量删除</Button>
                <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
                </span>
                <div style={listStyle} className="searchRes">

                    <Tabs defaultActiveKey="1" items={items} style={{marginLeft: 10}} onChange={onChange}/>
                    <div style={{ overflowX: 'auto' }}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        // headerBg: '#8dc5f8'
                                    },
                                },
                            }}
                        >
                            <Table columns={columns} dataSource={staticDate} pagination={{ pageSize: 4 }} rowSelection={rowSelection} />
                        </ConfigProvider>
                    </div>
                </div>
            </div>

        <Modal
            open={open}
            title="文章状态变更"
            okText="保存"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                name="changeStatue"
                initialValues={{ modifier: 'public' }}
                onFinish={onfinish}
            >

                <Form.Item name="status" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="1">公开</Radio>
                        <Radio value="2">私密</Radio>
                        <Radio value="3">草稿</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default AllNotes