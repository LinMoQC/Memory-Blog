import './inedx.sass'
import {Button, ColorPicker, Form, Input, Select, Tag, Tree, TreeDataNode,Alert} from "antd";
import React, {useState} from "react";
import {TagsOutlined} from '@ant-design/icons'

interface myTreeNode extends TreeDataNode{
    color: string
    children: myFieldDataNode[]
}

interface myFieldDataNode {
    title: string;
    color: string;
    key: string;
}

const TagsData: myTreeNode[] = [
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
const AllTag = () => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [level,setLevel] = useState('level_1')
    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        setSelectedKeys(selectedKeysValue);
    };

    const handleTagTypeChange = (value:string) => {
        setLevel(value);
        console.log(value)
    };

    return <>
        <div className="tag_card">
            <div className='newTagForm'>
                <Form
                    // onFinish={onFinish}
                    initialValues={{ tagType: '一级标签' }}
                    style={{ maxWidth: '400px' }}
                    name="标签管理"
                >
                    <h2 style={{ marginBottom: '20px' }}><TagsOutlined /> 标签管理</h2>
                    <Form.Item
                        name="tagName"
                        label="标签名称"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="tagType"
                        label="标签等级"
                    >
                        <Select options={[
                            { value: 'level_1', label: '一级标签' },
                            { value: 'level_2', label: '二级标签' },
                        ]} onChange={handleTagTypeChange}/>
                    </Form.Item>

                    {level==='level_2'&& <Form.Item
                        name="parentTag"
                        label="父标签"
                        shouldUpdate
                    >
                        <Select options={TagsData.map(({ children, ...rest }) => ({ ...rest })).map(tag => ({
                            value: tag.key,
                            label: tag.title
                        }))} />
                    </Form.Item>}

                    {level==='level_1'&& <Form.Item
                        name="tagColor"
                        label="标签颜色"
                    >
                        <ColorPicker defaultValue="#fff" showText />
                    </Form.Item>}

                    <Form.Item>
                        <Button type="primary"  htmlType="submit">
                            添加
                        </Button>
                        <Button type="primary" style={{marginLeft: 20,backgroundColor: '#f5222d'}}>
                            删除
                        </Button>

                    </Form.Item>
                    {selectedKeys.length!==0&& <Alert message={`选中删除标签：${selectedKeys.length} 个`} type="warning" showIcon />}
                </Form>
            </div>
            <Tree
                showLine
                multiple
                defaultExpandAll
                onSelect={onSelect}
                treeData={TagsData}
                titleRender={(node) => (
                    // @ts-ignore
                    <Tag color={node.color}>{node.title}</Tag>
                )}
            />

        </div>
    </>
}

export default  AllTag