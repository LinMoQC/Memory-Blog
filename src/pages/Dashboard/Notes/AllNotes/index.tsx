import './index.sass'
import {Button, Col, ConfigProvider, Form, Input, Menu, MenuProps, Row, Select, Space, theme, TreeSelect} from 'antd';
import { DatePicker} from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import zhCN from "antd/lib/locale/zh_CN";
import {useNavigate} from "react-router-dom";
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';

//图片引入
import img1 from '../../../../assets/formImg/img.webp'
import img2 from '../../../../assets/formImg/img1.webp'
import img3 from '../../../../assets/formImg/img2.jpg'
import img4 from '../../../../assets/formImg/img4.jpg'

interface DataType {
    key: string;
    cover: string;
    title: string;
    categories: string;
    tags: string[];
    isTop: boolean;
    time: Date;
    status: number
}

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
const items: MenuProps['items'] = [
    {
        label: '全部文章',
        key: 'All',
    },
    {
        label: '私密文章',
        key: 'private',
    },
    {
        label: '草稿箱',
        key: 'drafs',
    },
];
const Notesdata: DataType[] = [
    {
        key: '1',
        cover: img1,
        title: '深入理解神经网络',
        categories: '人工智能',
        tags: ["神经网络", "机器学习", "人工智能"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 1
    },
    {
        key: '2',
        cover: img2,
        title: '构建高性能的Web应用',
        categories: '前端',
        tags: ["Web开发", "性能优化", "前端", "后端"],
        isTop: false,
        time: new Date('2022-02-15'),
        status: 1
    },
    {
        key: '3',
        cover: img3,
        title: "掌握数据结构与算法",
        categories: '算法',
        tags: ["数据结构", "算法", "编程"],
        isTop: true,
        time: new Date('2022-03-20'),
        status: 1
    },
    {
        key: '4',
        cover: img4,
        title: '容器化应用与Docker"',
        categories: '容器',
        tags: ["Docker", "容器化", "DevOps"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 1
    },
    {
        key: '5',
        cover: img3,
        title: "掌握数据结构与算法",
        categories: '算法',
        tags: ["数据结构", "算法", "编程"],
        isTop: true,
        time: new Date('2022-03-20'),
        status: 1
    },
    {
        key: '6',
        cover: img4,
        title: '容器化应用与Docker"',
        categories: '容器',
        tags: ["Docker", "容器化", "DevOps"],
        isTop: true,
        time: new Date('2022-01-01'),
        status: 1
    },
];


const AdvancedSearchForm = () => {
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const formStyle: React.CSSProperties = {
        maxWidth: '98%',
        // background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        margin: 'auto',
        background: 'white'
    };


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                            {/* Select Options */}
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
                        name='tags'
                        label='文章标签'
                    >
                            <TreeSelect placeholder="请选择文章标签"
                                showSearch
                                style={{ width: '100%' }}
                                // value={value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                treeData={tags}
                            />
                    </Form.Item>
                </Col>
            </Row>

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
        </Form>
    );
};

const AllNotes = () => {
    const { token } = theme.useToken();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate()

    const listStyle: React.CSSProperties = {
        lineHeight: '200px',
        textAlign: 'center',
        background: 'white',
        borderRadius: token.borderRadiusLG,
        marginTop: 16,
        maxWidth: '98%',
        height: '420px',
        marginLeft: '1%',
        overflowY: 'auto'
    };


    const columns: TableProps<DataType>['columns'] = [
        {
            title: '封面缩略图',
            dataIndex: 'cover',
            key: 'cover',
            align: "center",
            render: (cover) => <img src={cover} alt="封面缩略图" style={{ maxWidth: '100px'}} />
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
            render: (categories) => <Tag color="#108ee9">{categories}</Tag>
        },
        {
            title: '文章标签',
            key: 'tags',
            dataIndex: 'tags',
            align: "center",
            render: (_, record) => (
                <>
                    {record.tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
            render: (status) => (status === 1 ? '公开' : status === 2 ? '私密' : status === 3 ? '草稿箱' : '未知状态'),
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (_, ) => (
                <Space size="middle">
                    <Button type='primary'>编辑</Button>
                    <Button type='primary' style={{background: '#f5222d'}}>删除</Button>
                    <Button type='primary' style={{background: '#13c2c2'}}>状态变更</Button>
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
    console.log(hasSelected)
    return <>
            <div className="AllCard">
                <AdvancedSearchForm />
                <Button type="primary" style={{marginLeft:15,marginTop:15,background: '#389e0d'}} onClick={() => navigate('newnote')}>新增</Button>
                <Button type="primary" style={{marginLeft:15,marginTop:15,background: '#f5222d'}}>批量删除</Button>
                <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
                </span>
                <div style={listStyle} className="searchRes">
                    <Menu mode="horizontal" items={items} defaultSelectedKeys={['All']}/>
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
                            <Table columns={columns} dataSource={Notesdata} pagination={{ pageSize: 4 }} rowSelection={rowSelection} />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
    </>
}

export default AllNotes