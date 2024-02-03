import './index.sass'
import {Avatar, Card, Col, Form, Input, message, Modal, Popconfirm, Row} from "antd";
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
// import Meta from "antd/es/card/Meta";
import avator from '../../../assets/avator.jpg'
import { ConfigProvider } from 'antd/lib';
import DeleteButton from "../../../components/Buttons/DeleteButton";
import NewButton from "../../../components/Buttons/NewButton";
import SearchButton from "../../../components/Buttons/SearchButton";
import {useState} from "react";

interface Talk{
    key: number;
    title: string,
    content: string
}

const talks :Talk[] = [
    {
        key: 1,
        title: "街头美食发现",
        content: "今天在街头巷尾闲逛，偶然发现一家超好吃的小吃摊🍜。分享一下这个小角落的美味，生活中的惊喜就藏在这些不经意间！ #街头美食"
    },
    {
        key: 2,
        title: "周末电影马拉松",
        content: "周末就是要窝在沙发上来一场电影马拉松🎥！你最近有看到什么好片推荐吗？一起来分享一下吧！ #电影时间"
    },
    {
        key: 3,
        title: "阅读时光",
        content: "窗外雨点滴答，正是最好的阅读时光📖。推荐一本近期看的好书，分享一下你们最近的阅读心得！ #阅读推荐"
    },
    {
        key: 4,
        title: "城市夜景",
        content: "夜晚的城市夜景总是那么迷人✨，灯火阑珊间感受城市的脉动。你们喜欢哪座城市的夜景呢？ #夜色撩人"
    },
    {
        key: 5,
        title: "户外冒险故事",
        content: "回顾一次精彩的户外冒险，山川河流中的每个瞬间都值得铭记。你有什么难忘的户外经历吗？ #户外冒险"
    },
    {
        key: 6,
        title: "夏日冰淇淋时光",
        content: "炎炎夏日，最好的解暑方式就是一支冰淇淋🍦。分享一下你最爱的口味！ #夏日甜品"
    },
    {
        key: 7,
        title: "音乐治愈时光",
        content: "今天随机播放的歌单居然全中我喜欢的歌曲🎶，这种巧合让一天都变得美好。分享一下你最近听到的好听歌曲吧！ #音乐治愈"
    },
    {
        key: 8,
        title: "秋日午后",
        content: "秋日午后，微风拂过，阳光透过树叶洒在身上，温暖而宁静。生活中的小确幸就隐藏在这样的瞬间。 #秋日时光"
    },
    {
        key: 9,
        title: "摄影心情",
        content: "抓住一个美好瞬间，按下快门，定格成永恒的回忆。分享一张你最近拍的照片吧！ #摄影心情"
    },
    {
        key: 10,
        title: "咖啡与心事",
        content: "一杯香浓的咖啡☕️，静静品味着生活的滋味。你们有喜欢的咖啡馆推荐吗？ #咖啡时光"
    },
    {
        key: 11,
        title: "城市漫步心情",
        content: "放慢脚步，漫步在熟悉的城市街头。突然发现原来身边的风景也可以如此美妙。 #城市漫步"
    },
    {
        key: 12,
        title: "假日甜点时光",
        content: "假日的下午，来一份美味的甜点🍰，心情瞬间变得愉悦。你们喜欢吃什么样的甜点呢？ #甜点时光"
    },
    {
        key: 13,
        title: "城市漫步心情",
        content: "放慢脚步，漫步在熟悉的城市街头。突然发现原来身边的风景也可以如此美妙。 #城市漫步"
    },
    {
        key: 14,
        title: "假日甜点时光",
        content: "假日的下午，来一份美味的甜点🍰，心情瞬间变得愉悦。你们喜欢吃什么样的甜点呢？ #甜点时光"
    }
];

const Comments = () => {
    //修改弹出窗口
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [staticDate,setStaticDate] = useState(talks)

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(() => {
            setConfirmLoading(true);
            // 这里替换成你的提交逻辑
            onFinish();
            message.success('发布成功')
            setOpen(false)
        });
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
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

    //确认逻辑
    const confirm = (key:number) => {
        console.log(key)
        setStaticDate(staticDate.filter(item => item.key!==key))
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
                                <EditOutlined key="edit" onClick={showModal}/>,
                                <Popconfirm
                                    title="删除确认"
                                    description="确定删除此说说?"
                                    onConfirm={()=>confirm(talk.key)}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    style={{position: 'absolute'}}
                                >
                                    <DeleteOutlined key="delete" />
                                </Popconfirm>
                            ]}
                        >
                            <Card.Meta
                                avatar={<Avatar src={avator} />}
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
                okText='提交'
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