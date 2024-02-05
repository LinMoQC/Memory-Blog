import './index.sass'
import {Avatar, Card, Col, Form, Input, message, Modal, Popconfirm, Row} from "antd";
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
import avatar from '../../../assets/avator.jpg'
import { ConfigProvider } from 'antd/lib';
import DeleteButton from "../../../components/Buttons/DeleteButton";
import NewButton from "../../../components/Buttons/NewButton";
import SearchButton from "../../../components/Buttons/SearchButton";
import {useState} from "react";
import {Talk} from "../../../interface/TalkType";

// interface Talk{
//     key: number;
//     title: string,
//     content: string,
//     time: Date
// }

const talks: Talk[] = [
    {
        key: 1,
        title: "街头美食发现",
        content: "今天在街头巷尾闲逛，偶然发现一家超好吃的小吃摊🍜。分享一下这个小角落的美味，生活中的惊喜就藏在这些不经意间！ #街头美食",
        time: new Date("2024-02-05T08:00:00")
    },
    {
        key: 2,
        title: "周末电影马拉松",
        content: "周末就是要窝在沙发上来一场电影马拉松🎥！你最近有看到什么好片推荐吗？一起来分享一下吧！ #电影时间",
        time: new Date("2024-02-05T10:00:00")
    },
    {
        key: 3,
        title: "阅读时光",
        content: "窗外雨点滴答，正是最好的阅读时光📖。推荐一本近期看的好书，分享一下你们最近的阅读心得！ #阅读推荐",
        time: new Date("2024-02-05T12:00:00")
    },
    {
        key: 4,
        title: "城市夜景",
        content: "夜晚的城市夜景总是那么迷人✨，灯火阑珊间感受城市的脉动。你们喜欢哪座城市的夜景呢？ #夜色撩人",
        time: new Date("2024-02-05T14:00:00")
    },
    {
        key: 5,
        title: "户外冒险故事",
        content: "回顾一次精彩的户外冒险，山川河流中的每个瞬间都值得铭记。你有什么难忘的户外经历吗？ #户外冒险",
        time: new Date("2024-02-05T16:00:00")
    },
    {
        key: 6,
        title: "夏日冰淇淋时光",
        content: "炎炎夏日，最好的解暑方式就是一支冰淇淋🍦。分享一下你最爱的口味！ #夏日甜品",
        time: new Date("2024-02-05T18:00:00")
    },
    {
        key: 7,
        title: "音乐治愈时光",
        content: "今天随机播放的歌单居然全中我喜欢的歌曲🎶，这种巧合让一天都变得美好。分享一下你最近听到的好听歌曲吧！ #音乐治愈",
        time: new Date("2024-02-05T20:00:00")
    },
    {
        key: 8,
        title: "秋日午后",
        content: "秋日午后，微风拂过，阳光透过树叶洒在身上，温暖而宁静。生活中的小确幸就隐藏在这样的瞬间。 #秋日时光",
        time: new Date("2024-02-05T22:00:00")
    },
    {
        key: 9,
        title: "摄影心情",
        content: "抓住一个美好瞬间，按下快门，定格成永恒的回忆。分享一张你最近拍的照片吧！ #摄影心情",
        time: new Date("2024-02-06T08:00:00")
    },
    {
        key: 10,
        title: "咖啡与心事",
        content: "一杯香浓的咖啡☕️，静静品味着生活的滋味。你们有喜欢的咖啡馆推荐吗？ #咖啡时光",
        time: new Date("2024-02-06T10:00:00")
    },
    {
        key: 11,
        title: "城市漫步心情",
        content: "放慢脚步，漫步在熟悉的城市街头。突然发现原来身边的风景也可以如此美妙。 #城市漫步",
        time: new Date("2024-02-06T12:00:00")
    },
    {
        key: 12,
        title: "假日甜点时光",
        content: "假日的下午，来一份美味的甜点🍰，心情瞬间变得愉悦。你们喜欢吃什么样的甜点呢？ #甜点时光",
        time: new Date("2024-02-06T14:00:00")
    },
    {
        key: 13,
        title: "城市漫步心情",
        content: "放慢脚步，漫步在熟悉的城市街头。突然发现原来身边的风景也可以如此美妙。 #城市漫步",
        time: new Date("2024-02-06T16:00:00")
    },
    {
        key: 14,
        title: "假日甜点时光",
        content: "假日的下午，来一份美味的甜点🍰，心情瞬间变得愉悦。你们喜欢吃什么样的甜点呢？ #甜点时光",
        time: new Date("2024-02-06T18:00:00")
    }
];


const Comments = () => {
    //hooks区域
        //修改弹出窗口
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [staticDate,setStaticDate] = useState(talks)
    const [isEdit,setEdit] = useState(0)

    const showModal = () => {
        setOpen(true);
    };

    const change_comment = (value: Talk) => {
        setEdit(value.key)
        showModal()
        form.setFieldsValue({
            title: value.title,
            content: value.content
        });
    }

    const handleOk = () => {
        if (isEdit !== 0) {
            const updatedData = staticDate.map(item => {
                if (item.key === isEdit) {
                    return {
                        ...item,
                        title: form.getFieldsValue().title,
                        content: form.getFieldsValue().content
                    };
                } else {
                    return item;
                }
            });
            setStaticDate(updatedData);
            message.success('修改成功')
            setEdit(0);
            form.resetFields();
            setOpen(false);
        } else {
            form.validateFields().then(() => {
                setConfirmLoading(true);
                // 这里替换成你的提交逻辑
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
    const confirm = (key:number) => {
        setStaticDate(staticDate.filter(item => item.key!==key))
        message.success('删除成功')
    }
    //表单提交
    const onFinish = () => {
        // 获取整个表单的值
        const formValues = form.getFieldsValue();
        const key = staticDate.length+1
        const date = {
            ...formValues,
            key: key
        }
        setStaticDate([
            ...staticDate,
            date
        ])
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



    return <div className='Comments_Body'>
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
                    <SearchButton style={{marginLeft: '50px'}}/>
                </div>
                <DeleteButton />
            </div>
            <Row gutter={16} style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                {staticDate.map(talk => (
                    <Col key={talk.key}>
                        <Card
                            hoverable
                            style={{ width: 300, marginTop: 25 }}
                            className='talkCard'
                            actions={[
                                <EditOutlined key="edit" onClick={()=>change_comment(talk)}/>,
                                <Popconfirm
                                    title="删除确认"
                                    description="确定删除此说说?"
                                    onConfirm={()=>confirm(talk.key)}
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
                                title={talk.title}
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
                    <Form.Item label="标题" name="title">
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