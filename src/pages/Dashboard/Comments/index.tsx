import './index.sass'
import {Avatar, Card, Col, Form, Input, message, Modal, Popconfirm, Row} from "antd";
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
import { ConfigProvider } from 'antd/lib';
import NewButton from "../../../components/Buttons/NewButton";
import SearchButton from "../../../components/Buttons/SearchButton";
import {useEffect, useState} from "react";
import {Talk} from "../../../interface/TalkType";
import dayjs from "dayjs";
import http from "../../../apis/axios.tsx";
import {useSelector} from "react-redux";
import UserState from "../../../interface/UserState";

const Comments = () => {
    //hooks区域
        //修改弹出窗口
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [talks,setTalks] = useState([])
    const [isEdit,setEdit] = useState(0)
    const avatar = useSelector((state: { user: UserState }) => state.user.avatar);


    useEffect(() => {
        getTalkList().then((res) => {
            setTalks(res)
        })
    },[])

    //获取说说
    const getTalkList = async () => {
        return http({
            url: '/api/public/talk',
            method: "GET"
        }).then((res) => {
            return res.data.data
        }).catch((err)=>{
            console.log(err)
        })
    }

    const showModal = () => {
        setOpen(true);
    };

    const change_comment = (value: Talk) => {
        setEdit(value.talkKey)
        showModal()
        form.setFieldsValue({
            talkTitle: value.talkTitle,
            content: value.content,
        });
    }

    const handleOk = async () => {
        if (isEdit !== 0) {
            const data = {
                talkTitle: form.getFieldsValue().talkTitle,
                content: form.getFieldsValue().content,
                updateTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }
            http({
                url: `/api/protect/talk/${isEdit}`,
                method: "POST",
                data: data
            }).then(async (res) => {
                if (res.status == 200) {
                    getTalkList().then((res) => {
                        setTalks(res)
                        message.success("修改成功")
                        setEdit(0);
                        form.resetFields();
                        setOpen(false);
                    })
                } else {
                    await message.error("修改失败")
                    setEdit(0);
                    form.resetFields();
                    setOpen(false);
                }
            })
        } else {
            form.validateFields().then(() => {
                setConfirmLoading(true);
                onFinish();
                message.success('发布成功');
                setConfirmLoading(false);
                form.resetFields();
                setOpen(false);
            });
        }
    };

    const handleCancel = () => {
        setEdit(0)
        form.resetFields()
        setOpen(false);
    };

    //确认逻辑
    const confirm = async (id: number) => {
        try {
            http({
                url: `/api/protect/talk/${id}`,
                method: "DELETE"
            }).then(async (res) => {
                if (res.status === 200) {
                    getTalkList().then((res) => {
                        setTalks(res)
                        message.success("删除成功")
                    })
                } else {
                    await message.error("删除失败")
                }
            })
        } catch (err) {
            console.log(err);
            await message.error("删除失败")
        }
    }
    //表单提交
    const onFinish = async () => {
        const formValues = form.getFieldsValue();
        const date = {
            ...formValues,
            createTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }
        const res = await http({
            url: '/api/protect/talk',
            method: "POST",
            data: date
        })
        if(res.status === 200){
            getTalkList().then((res) => {
                setTalks(res)
            })
        }
    };

    //弹窗表单
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



    return <div className='Comments_Body allin'>
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                    },
                },
            }}
        >
            <div className="action">
                <NewButton onClick={showModal}/>
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                    <h2> <i className="iconfont icon-pinglun4" style={{ fontWeight: '100', fontSize: 50, color: '#13a8a8' }} /> 说说  </h2>

                </div>
                <SearchButton style={{marginLeft: '50px'}}/>
            </div>
            <Row gutter={16} style={{ display: 'grid',
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gridGap: 30 }}>
                {talks.map((talk:Talk) => (
                    <Col key={talk.talkKey}>
                        <Card
                            hoverable
                            style={{ width: 300, marginTop: 25 ,fontWeight:600}}
                            className='talkCard'
                            actions={[
                                <EditOutlined key="edit" onClick={()=>change_comment(talk)}/>,
                                <Popconfirm
                                    title="删除确认"
                                    description="确定删除此说说?"
                                    onConfirm={()=>confirm(talk.talkKey)}
                                    okText="Yes"
                                    cancelText="No"
                                    style={{position: 'absolute'}}
                                >
                                    <DeleteOutlined key="delete" />
                                </Popconfirm>
                            ]}
                        >
                            <Card.Meta
                                avatar={<Avatar src={avatar} />}
                                title={talk.talkTitle}
                                description={talk.content}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title="说说修改"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={isEdit===0? '发布' : '保存'}
                cancelText='取消'
            >
                <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
                    <Form.Item label="标题" name="talkTitle">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                    >
                        <Input.TextArea autoSize/>
                    </Form.Item>

                </Form>
            </Modal>
        </ConfigProvider>
    </div>
}

export default Comments