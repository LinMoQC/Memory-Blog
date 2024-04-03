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
import {formatNote, NoteType} from "../../../../interface/NoteType";
import {useDispatch, useSelector} from "react-redux";
import {fetchNoteList} from "../../../../store/components/note.tsx";
import { QuestionCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {renderNoteTags} from "../../../../apis/TagMethods.tsx";
import {delAllNotes, delNote, getNotes, searchNotes, updateNoteStatus} from "../../../../apis/NoteMethods.tsx";
interface AdvancedSearchFormProps {
    setSearchNotes: (value: (((prevState: any[]) => any[]) | any[])) => void,
}

const AdvancedSearchForm = ({setSearchNotes}: AdvancedSearchFormProps) => {
    //hooks区域
    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const categories = useSelector((state: {categories: any}) => state.categories.categories);
    const tagList = useSelector((state: {tags: any}) => state.tags.tag)

    //回调函数区域
    const onFinish = async (values: any) => {
        const data = {
            ...values,
            // tagsLab: values.tagsLab.toString()
        }
        try {
            const res = await searchNotes(data)
            if(res.status === 200){
                setSearchNotes(res.data.data.map((item: formatNote) => {
                    return {
                        ...item,
                        key: item.noteKey,
                        noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                    }
                }))
            }
        }catch (error){
            message.error("搜索失败")
        }
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
                            { value: 1, label: '是' },
                            { value: 0, label: '否' },
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
        initNotes()
    },[])

    const initNotes = async () => {
        const res = await getNotes()
        setStaticDate(res.data.data.map((item: formatNote) => {
            return {
                ...item,
                key: item.noteKey,
                noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
            }
        }))
    }


    const DeleteNote = async (key:number) => {
        try {
            const res = await delNote(key)
            if(res.status === 200){
                await initNotes()
                dispatch<any>(fetchNoteList())
                message.success('删除成功')
            }
        }catch (error){
            console.log(error)
        }
    }

    const deleteAll = async () => {
        try {
            const res = await delAllNotes(selectedRowKeys)
            if (res.status === 200) {
                await initNotes()
                dispatch<any>(fetchNoteList())
                setSelectedRowKeys([])
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showModal = (value:NoteType) => {
        setOpen(true)
        setEdit(value.key)
    }

    const onOk = async () => {
        const data = {
            isTop: Number(form.getFieldsValue().top),
            status: form.getFieldsValue().status,
            updateTime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
        }
        try{
            const res = await updateNoteStatus(data,isEdit)
            if(res.status === 200){
                await initNotes()
                message.success('状态变更成功')
            }
        }catch (error){
            message.error("状态更新失败")
        }
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
                                    <Space align={'center'} size={3}>
                                        <i className={`iconfont ${category.icon}`} style={{ display: 'block', fontSize: 20}}></i>
                                        <span style={{ fontSize: 16}}>{category.categoryTitle}</span>
                                    </Space>
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
                        {renderNoteTags(record.noteTags,tagList)}
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
                <div style={{display: "flex",flexDirection:'row',alignItems:'center'}}>
                    <Fab color="info" aria-label="edit" size='small' style={{marginRight:7}} onClick={() => navigate(`newnote/${item.key}`)}>
                        <EditIcon />
                    </Fab>
                    <Popconfirm
                        title="删除确认"
                        description="确定删除此文章？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText='删除'
                        onConfirm={() => DeleteNote(item.key)}
                        cancelText='取消'
                    >
                        <Fab color="error" aria-label="edit" size='small' style={{marginRight:7}}>
                            <DeleteIcon />
                        </Fab>
                    </Popconfirm>
                    <Fab color="secondary" aria-label="edit" size='small' onClick={() => showModal(item)}>
                        <ChangeCircleIcon />
                    </Fab>
                </div>
            ),
        },
    ];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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


    const onChange = async (value:string) => {
        if (parseInt(value) === 1){
            await initNotes()
        }else if (parseInt(value) === 2){
            setStaticDate(staticDate.filter(item => item.status==='private'))
            searchNotes({
                status: 'private'
            }).then((res) => {
                if(res.status === 200){
                    setStaticDate(res.data.data.map((item: formatNote) => {
                        return {
                            ...item,
                            key: item.noteKey,
                            noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                        }
                    }))
                }
            })
        }else {
            searchNotes({
                status: 'draft'
            }).then((res) => {
                if(res.status === 200){
                    setStaticDate(res.data.data.map((item: formatNote) => {
                        return {
                            ...item,
                            key: item.noteKey,
                            noteTags: item.noteTags ? item.noteTags.split(',').map(tag => parseInt(tag, 10)) : [],
                        }
                    }))
                }
            })
        }
    }
    return <>
        <div className="AllCard">
            <AdvancedSearchForm setSearchNotes={setStaticDate}/>
            <Fab color="primary" aria-label="add" size='small' onClick={() => navigate('newnote')} style={{marginLeft:15,marginTop:15}}>
                <AddIcon />
            </Fab>
            {hasSelected&&<Fab variant="extended" color='error' size='medium' style={{marginLeft:15,marginTop:15}} onClick={showdelModal}>
                <DeleteForeverIcon sx={{ mr: 1 }} className='allin'/>
                批量删除
            </Fab>}

            <div className="searchRes">
                <Tabs defaultActiveKey="1" items={items} style={{marginLeft: 10}} onChange={onChange} />
                <div style={{ overflowX: 'hidden' }}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                },
                            },
                        }}
                    >
                        <Table columns={columns} dataSource={staticDate} pagination={{ pageSize: 8 }} rowSelection={rowSelection} scroll={{y:'40vh',x:1000}}/>
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