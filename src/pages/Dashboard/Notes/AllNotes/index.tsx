import './index.sass'
import {
    Button,
    Col,
    ConfigProvider,
    Form, Image,
    Input, message,
    Modal, Popconfirm,
    Radio,
    Row,
    Select,
    Space, Tabs,
    theme,
    TreeSelect
} from 'antd';
import { DatePicker} from 'antd';
import React, {useEffect, useState} from "react";
import zhCN from "antd/lib/locale/zh_CN";
import {useNavigate} from "react-router-dom";
import { Table, Tag } from 'antd';
import type { TableProps, TabsProps } from 'antd';
import {NoteType} from "../../../../interface/NoteType";
import {useDispatch, useSelector} from "react-redux";
import http from "../../../../apis/axios.tsx";
import {fetchNoteList} from "../../../../store/components/note.tsx";
import { QuestionCircleOutlined } from '@ant-design/icons';
const AdvancedSearchForm = () => {
    //hooks区域
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const categories = useSelector((state: {categories: any}) => state.categories.categories);
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)

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
                            {categories.map((category: { key: React.Key | null | undefined; categoryTitle: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                <Select.Option key={category.key} value={category.categoryTitle}>
                                    {category.categoryTitle}
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
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate()
    const [staticDate,setStaticDate] = useState<NoteType[]>([])
    const [open, setOpen] = useState(false);
    const [isEdit,setEdit] = useState('')
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)
    const categories = useSelector((state: {categories: any}) => state.categories.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getNotes()
    },[])

    const getNotes = () => {
        http({
            url: '/api/protected/notes',
            method: 'GET'
        }).then((res) => {
            setStaticDate(res.data.data.map((item: { noteKey: number; noteTitle: string; noteContent: string; description: string; cover: string; noteCategory: string; noteTags: string; isTop: number; status: string; createTime: Date; updateTime: Date; }) => {
                return {
                    key: item.noteKey,
                    noteTitle: item.noteTitle,
                    noteContent: item.noteContent,
                    description: item.description,
                    cover: item.cover,
                    noteCategory: item.noteCategory,
                    noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                    isTop: item.isTop,
                    status: item.status,
                    createTime: item.createTime,
                    updateTime: item.updateTime
                }
            }))
        })
    }


    const DeleteNote = (key:number) => {
        http({
            url: '/api/protected/notes',
            method: 'DELETE',
            data: [key]
        }).then((res) => {
            if(res.status === 200){
                getNotes()
                dispatch<any>(fetchNoteList())
                message.success('删除成功')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteAll = () => {
        http({
            url: '/api/protected/notes',
            method: 'DELETE',
            data: selectedRowKeys
        }).then((res) => {
            if(res.status === 200){
                getNotes()
                dispatch<any>(fetchNoteList())
                message.success('删除成功')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const showModal = (value:NoteType) => {
        setOpen(true)
        setEdit(value.key)
    }

    const onOk = () => {
        const data = {
            isTop: Number(form.getFieldsValue().top),
            status: form.getFieldsValue().status
        }

        http({
            url: `/api/protected/notes/${isEdit}`,
            method: 'POST',
            data: data
        }).then((res) => {
            if(res.status === 200){
                getNotes()
                message.success('状态变更成功')
            }
        }).catch((error) => {
            message.error("状态更新失败" + error)
        })
        setEdit('0');
        form.resetFields();
        setOpen(false)
    }

    const onCancel = () => {
        setOpen(false)
    }

    const onfinish = () => {

    }

    const showdelModal = () => {
        setIsModalOpen(true);
    };

    const handledelOk = () => {
        deleteAll()
        setIsModalOpen(false);
    };

    const handledelCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<NoteType>['columns'] = [
        {
            title: '封面缩略图',
            dataIndex: 'cover',
            key: 'cover',
            align: "center",
            render: (cover) => <Image src={cover} alt="封面缩略图" style={{ maxWidth: '100px',borderRadius: 5}} />
        },
        {
            title: '文章标题',
            dataIndex: 'noteTitle',
            key: 'title',
            align: "center"
        },
        {
            title: '文章分类',
            dataIndex: 'noteCategory',
            key: 'categories',
            align: "center",
            render: (item) => (
                <>
                    {categories
                        .filter((category: { categoryTitle: string; }) => category.categoryTitle === item)
                        .map((category: { color: string | (string & {}) | undefined; key: React.Key | null | undefined; icon: any; categoryTitle: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
                                <Tag color={category.color} key={category.key}>
                                    <i className={`iconfont ${category.icon}`} style={{ display: 'inline', fontSize: 20,marginTop:1 }}></i>
                                    <span style={{ fontSize: 16 ,marginBottom:1,marginLeft:3}}>{category.categoryTitle}</span>
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
            render: (_, record) => {
                return (
                    <>
                        {record.noteTags.map(noteTag => {
                            let color;
                            let name;
                            // Iterate over all tagList items
                            tagList.forEach((tag: { tagKey: number; color: string; title: string; children: any[]; }) => {
                                // If the tag exists in the current tagList item, set color and name
                                if (tag.tagKey === noteTag) {
                                    color = tag.color;
                                    name = tag.title;
                                } else if (tag.children && tag.children.some(child => child.tagKey === noteTag)) {
                                    // Fix here: Changed child.title to tag.children.find(child => child.tagKey === noteTag).title
                                    color = tag.color;
                                    name = tag.children.find(child => child.tagKey === noteTag).title;
                                }
                            });

                            return (
                                <Tag color={color} key={noteTag} style={{margin:5}}>
                                    {name}
                                </Tag>
                            );
                        })}
                    </>
                );
            }

        },
            {
            title: '是否置顶',
            key: 'isTop',
            dataIndex: 'isTop',
            align: "center",
            render: (isTop) => (isTop ? <i className={`iconfont icon-yes`} style={{fontSize:24}}></i> : <i className={`iconfont icon-no`} style={{fontSize:24}}></i>),
        },
        {
            title: '最近更新时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
            align: "center",
            render: (time) => <div style={{width:160,height:26,color:'rgba(0,0,0.88)',fontWeight:600,borderRadius:10}}>{time}</div>,
        },
        {
            title: '文章状态',
            key: 'status',
            dataIndex: 'status',
            align: "center",
            render: (status) => (status === 'public' ?  <i className={`iconfont icon-public1`}></i> : status === 'private' ? <i className={`iconfont icon-private4`}></i>: status === 'draft' ? <i className={`iconfont icon-caogaoxiang1`}></i>: '未知状态'),
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (item) => (
                <div style={{display: "flex",flexDirection:'column',alignItems:'center'}}>
                        <Button type='primary' onClick={() => navigate(`newnote/${item.key}`)} style={{marginBottom: 10}}><i className={`iconfont icon-bianji`} style={{fontSize:16,marginRight:'0.2em'}}></i> 编辑</Button>
                    <Popconfirm
                        title="删除确认"
                        description="确定删除此文章？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText='删除'
                        onConfirm={() => DeleteNote(item.key)}
                        cancelText='取消'
                    >
                        <Button type='primary' style={{background: '#f5222d',marginBottom:10}} ><i className={`iconfont icon-shanchu1`} style={{fontSize:16,marginRight:'0.2em'}}></i>删除</Button>
                    </Popconfirm>
                        <Button type='primary' style={{background: '#13c2c2'}} onClick={() => showModal(item)}><i className={`iconfont icon-biangeng`} style={{fontSize:16,marginRight:'0.2em'}}></i> 状态变更</Button>
                </div>
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
            getNotes()
        }else if (parseInt(value) === 2){
            setStaticDate(staticDate.filter(item => item.status==='private'))
        }else {
            setStaticDate(staticDate.filter(item => item.status=== 'draft'))
        }
    }
    return <>
            <div className="AllCard">
                <AdvancedSearchForm />
                <Button type="primary" style={{marginLeft:15,marginTop:15}} onClick={() => navigate('newnote')}>新增</Button>
                {hasSelected&&<Button  danger style={{marginLeft:15,marginTop:15,background:'transparent'}} onClick={showdelModal}>批量删除</Button>}
                <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
                </span>
                <div className="searchRes">
                    <Tabs defaultActiveKey="1" items={items} style={{marginLeft: 10}} onChange={onChange} />
                    <div style={{ overflowX: 'hidden' }}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        // headerBg: '#8dc5f8'
                                    },
                                },
                            }}
                        >
                            <Table columns={columns} dataSource={staticDate} pagination={{ pageSize: 4 }} rowSelection={rowSelection} scroll={{y:290,x:1000}}/>
                        </ConfigProvider>
                    </div>
                </div>
            </div>

        <Modal
            open={open}
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

                <Form.Item name="status" className="collection-create-form_last-form-item" label={<h4>文章状态</h4>}>
                    <Radio.Group>
                        <Radio value="public">公开</Radio>
                        <Radio value="private">私密</Radio>
                        <Radio value="draft">草稿</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="top" label={<h4>是否置顶</h4>}>
                    <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="0">否</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>

        <Modal title="删除确认" open={isModalOpen} onOk={handledelOk} onCancel={handledelCancel}  okText="确定" cancelText="取消">
            是否删除选中所有文章?
        </Modal>
    </>
}

export default AllNotes