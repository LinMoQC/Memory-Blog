import {Button, ConfigProvider, Form, Input, Upload} from 'antd';
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import './index.sass'
import MainContext from "../../../components/conText.tsx";
import {useContext, useState} from "react";
const UserControl_back = () => {
    const userControlList = [
        {
            id: 1,
            name: '修改密码',
        },
        {
            id: 2,
            name: '修改账号',
        },
        {
            id: 3,
            name: '修改头像',
        },
        {
            id: 4,
            name: '修改签名',
        }

    ]
    const [ListKey,setListKey] = useState(1)
    const ListTemp = [
        {
            id: 1,
            content: <div>
                <Form.Item
                    name="oldPassword"
                    label="原密码"
                    rules={[{ required: true, message: '请输入原密码' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="原密码"
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[{ required: true, message: '请输入新密码' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="新密码"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: '请确认新密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入的密码不一致');
                            },
                        }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="确认密码"
                    />
                </Form.Item>
            </div>
        },
        {
            id: 2,
            content: <div>
                <Form.Item
                    name="name"
                    label="昵称"
                    className='FormDark'
                >
                    <Input  placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="账号"
                    rules={[{message: 'Please input your Username!' }]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
            </div>
        },
        {
            id: 3,
            content: <div>
                <Form.Item label="头像" name="avatar" valuePropName="fileList" getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e.slice(-1); // 返回数组中的最后一个元素，即上传的最后一个文件
                    }
                    return e && e.fileList.slice(-1);
                }}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
            </div>
        },
        {
            id: 4,
            content: <div>
                <Form.Item label="个性签名" name="remark">
                    <TextArea
                        showCount
                        maxLength={100}
                        placeholder="talk something..."
                        style={{ height: 120, resize: 'none' }}
                    />
                </Form.Item>
            </div>
        }
    ]


    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
    };

    // const onFinishFailed = (errorInfo: FieldType) => {
    //     console.log('Failed:', errorInfo);
    // };

    type FieldType = {
        username?: string;
        password?: string;
    };

    const isDark = JSON.parse(useContext(MainContext))
    return <div>


        <div className='FormContainer'>
            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            labelColor: isDark?'rgba(243,243,243,0.88)':'rgba(0,0,0,0.88)'
                        },
                    },
                }}
            >
                <div className="mydict">
                    <div>
                        {userControlList.map(item => (
                            <label key={item.id}>
                                <input type="radio" name="radio" defaultChecked={item.id === 1} onClick={() => setListKey(item.id)}/>
                                <span>{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {ListTemp.filter(item => item.id === ListKey).map(item => item.content)}
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>

    </div>
}

export default UserControl_back