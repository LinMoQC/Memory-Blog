import './inedx.sass'
import {
    Button,
    ColorPicker,
    Form,
    Input,
    Select,
    Tag,
    Tree,
    Alert, message,
} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {TagsOutlined} from '@ant-design/icons'
import {TagLevelOne,newTag} from "../../../../interface/TagType";
import {fetchTags} from "../../../../store/components/tags.tsx";
import {useDispatch} from "react-redux";
import {addTagOne, addTagTwo, delTag, initTree} from "../../../../apis/TagMethods.tsx";

const AllTag = () => {
    // hooks区域
    const tree = useRef(null)
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [level,setLevel] = useState('level_1')
    const [staticDate,setStaticDate] = useState<TagLevelOne[]>([])
    const dispatch = useDispatch()
    useEffect(() => {
        initTree().then((res) => {
            setStaticDate(res)
        })
    }, []);

    //回调函数
    const onSelect = (selectedKeysValue: React.Key[]) => {
        console.log(selectedKeysValue)
        setSelectedKeys(selectedKeysValue);
    };

    const handleTagTypeChange = (value:string) => {
        console.log(value)
        setLevel(value);
    };

    const Delete = async () => {
        if (selectedKeys.length === 0) {
            message.warning('待选中')
            return
        }

        const res = await delTag(selectedKeys)
        if(res.status === 200){
            const Tree = await initTree()
            setStaticDate(Tree)
            setSelectedKeys([])
            if(tree.current)
            { // @ts-ignore
                tree.current.state.selectedKeys = []
            }
            dispatch<any>(fetchTags())
            message.success("删除成功")
        }
    };
    const onfinish = async (values: newTag) => {
        if (values.level === 'level_1') {
            let color: string
            if (values.color && values.color.toHexString) {
                color = values.color.toHexString();
            } else {
                color = 'black'; // 否则使用默认颜色 #fff
            }

            const newTag = {
                title: values.title,
                color: color,
            };

            try {
                const res = await addTagOne(newTag)
                if(res.status === 200){
                    const Tree = await initTree()
                    setStaticDate(Tree)
                    dispatch<any>(fetchTags())
                    message.success('添加成功');
                }
            } catch (error) {
                await message.error("添加失败：" + '已存在')
            }
        } else {
            const fatherTag = staticDate.find(item => item.key === values.fatherTag);
            if (fatherTag) {
                const len = fatherTag.children?.length
                const newTag = {
                    title: values.title,
                    tagKey: fatherTag?.children.length > 0 ? fatherTag.children[len - 1].key + 1 : fatherTag.key * 100 + 1,
                    color: fatherTag.color,
                    fatherTag: fatherTag.title,
                }

                try {
                    const res = await addTagTwo(newTag)
                    if(res.status === 200){
                        const Tree = await initTree()
                        setStaticDate(Tree)
                        dispatch<any>(fetchTags())
                        message.success('添加成功');
                    }
                } catch (error) {
                    await message.error("添加失败：" + '已存在')
                }
            }
        }
    }

    return <>
        <div className="tag_card">
            <div className='newTagForm'>
                <Form
                    // onFinish={onFinish}
                    initialValues={{ tagType: '一级标签' }}
                    style={{ maxWidth: '400px' }}
                    name="标签管理"
                    onFinish={onfinish}
                >
                    <h2 style={{ marginBottom: '20px' }}><TagsOutlined /> 标签管理</h2>
                    <Form.Item
                        name="title"
                        label="标签名称"
                        rules={[{ required: true ,message: '必填项' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="level"
                        label="标签等级"
                    >
                        <Select options={[
                            { value: 'level_1', label: '一级标签' },
                            { value: 'level_2', label: '二级标签' },
                        ]} onChange={handleTagTypeChange}/>
                    </Form.Item>

                    {level==='level_2'&& <Form.Item
                        name="fatherTag"
                        label="父标签"
                        shouldUpdate
                    >
                        <Select options={staticDate.map(({ children, ...rest }) => ({ ...rest })).map(tag => ({
                            value: tag.key,
                            label: tag.title
                        }))} />
                    </Form.Item>}

                    {level==='level_1'&& <Form.Item
                        name="color"
                        label="标签颜色"
                    >
                        <ColorPicker defaultValue="black" showText format={"hex"}/>
                    </Form.Item>}

                    <Form.Item>
                        <Button type="primary"  htmlType="submit">
                            添加
                        </Button>
                        <Button type="primary" style={{marginLeft: 20,backgroundColor: '#f5222d'}} onClick={Delete}>
                            删除
                        </Button>

                    </Form.Item>
                    <Alert message={`选中删除标签：${selectedKeys.length} 个`} type="warning" showIcon style={{position: 'absolute',transition: '0.3s',opacity: selectedKeys.length===0?0:1}}/>
                </Form>
            </div>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'center',height:'100%'}}>
                <Tree
                    showLine
                    multiple
                    defaultExpandAll
                    onSelect={onSelect}
                    treeData={staticDate}
                    titleRender={(node) => (
                        <Tag color={node.color}>{node.title}</Tag>
                    )}
                    ref={tree}
                    virtual={true}
                    height={500}
                />
            </div>

        </div>
    </>
}

export default  AllTag