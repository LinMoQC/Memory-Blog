import {Button, ConfigProvider, Form, Input, Upload} from 'antd';
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import './index.sass'
import MainContext from "../../../components/conText.tsx";
import {useContext} from "react";
const UserControl = () => {
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e.slice(-1); // 返回数组中的最后一个元素，即上传的最后一个文件
        }
        return e && e.fileList.slice(-1); // 返回文件列表中的最后一个文件
    };


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
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
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item label="头像" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="个性签名" name="remark">
                        <TextArea
                            showCount
                            maxLength={100}
                            placeholder="talk something..."
                            style={{ height: 120, resize: 'none' }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>

    </div>
}

export default UserControl