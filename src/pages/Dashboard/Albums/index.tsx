import InfiniteScroll from 'react-infinite-scroll-component';
import './index.sass'
import {Card, Modal, UploadFile} from "antd";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import UpLoadButton from "../../../components/Buttons/UpLoadButton";
import {useState} from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import CheckButton from "../../../components/Buttons/CheckButton";
interface ImgUrl {
    title?:string
    key: number
    url: string
}

//图库静态模拟数据
const source: ImgUrl[] = [
    {
        key: 1,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/06df2f82eaba7b4ea9c7eb13e1f00eba.png',
    },
    {
        key: 2,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/0bb4f277217ab460dea37d4ab0b9b08b.jpg',
    },
    {
        key: 3,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/0e41836c5e4908002d25c38217ca7e92.jpg',
    },
    {
        key: 4,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1628740117208.png',
    },
    {
        key: 5,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1656780415433.png',
    },
    {
        key: 17,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/33a1d238f41bcd6994390b5a52067cd6.png',
    },
    {
        key: 19,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/3c850b578662bff5.png',
    },
    {
        key: 20,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/56073c0753a31b8b86456a78d04b2751.jpg',
    },
    {
        key: 21,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/57c361dffb69422683325d589a95f5bd.png',
    },
    {
        key: 22,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7bb6346225d07aa8d204bd4854615d9b.jpg',
    },
    {
        key: 23,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7ea0a31aea6a8654ced9bee94228e7d8.jpg',
    },
    {
        key: 24,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7eb9fece77081700ef0bf31d7099cea0.png',
    },
    {
        key: 25,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7f54217ed1bd89b3138393c4bf12e965.png',
    },
    {
        key: 26,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/83198143a70ead70d55a0ca48f90ff92.png',
    },
];


const Albums = () => {
    //状态变量区
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile<any>[]>([]);
    const [SelectDelete,setSelectDelete] = useState(0)
    const [checkStatus, setCheckStatus] = useState<Record<number, boolean>>({});
    const [staticDate,setStaticDate] = useState(source)
    const fetchData = () => {
        // Implement your logic to fetch more data
    };

    const Delete = () => {
        // @ts-ignore
        //拿出所有的键
        const keysToDelete = Object.keys(checkStatus).filter(key => checkStatus[key]);

        // 根据 keysToDelete 过滤 staticDate 数组
        setStaticDate(prevStaticDate => (
            prevStaticDate.filter(item => !keysToDelete.includes(item.key.toString()))
        ));

        // 删除完毕后清空 checkStatus
        setCheckStatus({});
        setSelectDelete(0)
    }


    // 触发选择框和图片点击
    const handleItemClick = (key:number) => {
        // 检查当前图片对应的复选框状态
        const isChecked = checkStatus[key] || false;

        // 更新复选框状态
        setCheckStatus(prevState => ({
            ...prevState,
            [key]: !isChecked // 切换复选框状态
        }));

        // 更新选择的数量
        setSelectDelete(prevCount => isChecked ? prevCount - 1 : prevCount + 1);
    };



    //上传悬浮框
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setUploadedFiles([])
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setUploadedFiles([])
        setIsModalOpen(false);
    };

    //推拽上传
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: 'file',
        fileList: uploadedFiles,
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            setUploadedFiles(info.fileList);
            if (status === 'done') {
                const f = info.file
                console.log(f.url)
                setStaticDate(prevStaticDate => [
                    ...prevStaticDate,
                    {
                        key: staticDate.length + 1,
                        url: 'data:image/png;base64,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' || '' // 如果 thumbUrl 可能为 undefined，可以提供一个默认值
                    }
                ]);
                console.log(staticDate)
                message.success(`${info.file.name} 图片上传成功`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 图片上传失败`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return <div style={{height: '100%'}}>
        <InfiniteScroll
        dataLength={source.length}
        next={fetchData}
        hasMore={true}
        loader={null}
        endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>
        }
    >
            <div style={{display: "flex",flexDirection: 'row',alignItems:'center',justifyContent: 'space-between',marginTop: 30,marginLeft: 20,marginRight: 20}} className={"action_img"}>
                <UpLoadButton onClick={showModal} />
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                    <h2 style={{display: "flex", flexDirection: 'row', alignItems: 'center'}}> <i className="iconfont icon-xiangce icon" style={{ fontWeight: '80', fontSize: 50, color: '#1668dc' }} /> 图库  </h2>
                </div>
                <div style={{display: "flex",alignItems:'center'}}>
                    <h2 style={{position: "absolute", right: 180, opacity: SelectDelete !== 0 ? 1 : 0, transition: '0.3s'}}>已选中{SelectDelete}张图片</h2>
                    <div onClick={Delete}>
                        <DeleteButton />
                    </div>
                </div>
            </div>
            <Card style={{ width: '100%', height: '86vh', marginLeft: '0%', marginTop: '0%', overflowY: 'scroll', backgroundColor: 'transparent', border: "none" }}>
                {staticDate.map(item => (
                    <div key={item.key} style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{ position: 'absolute', top: 30, right: 40, transform: 'scale(0.8)',zIndex: 3 }}>
                            <CheckButton
                                checked={checkStatus[item.key] || false}
                                handleCheckBoxChange={() => handleItemClick(item.key)}
                            />
                        </div>
                        <img
                            src={item.url}
                            alt={item.title}
                            onClick={() => handleItemClick(item.key)}
                            style={{ maxWidth: 250, maxHeight: 250, margin: 40, marginLeft: 45, marginTop: 30, borderRadius: 10 }}
                            className='imgShade'
                        />
                    </div>
                ))}
            </Card>

            <Modal
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText='完成'
                   cancelText='取消'
            >
                <Dragger {...props} listType='picture'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
                    <p className="ant-upload-hint">
                        支持单个或批量上传
                    </p>
                </Dragger>


            </Modal>
    </InfiniteScroll>
    </div>
}

export default Albums