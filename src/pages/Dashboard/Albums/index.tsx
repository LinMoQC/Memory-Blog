import InfiniteScroll from 'react-infinite-scroll-component';
import './index.sass'
import {Card, Modal, UploadFile} from "antd";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import UpLoadButton from "../../../components/Buttons/UpLoadButton";
import {useState} from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
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
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile<any>[]>([]);
    const [SelectDelete,setSelectDelete] = useState(0)
    const fetchData = () => {
        // Implement your logic to fetch more data
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
            setUploadedFiles(info.fileList)
            if (status === 'done') {
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
                    {SelectDelete!==0&& <h2>已选中{SelectDelete}张图片</h2>}
                    <DeleteButton />
                </div>
            </div>
            <Card style={{width: '100%',height: '86vh',marginLeft: '0%',marginTop: '0%',overflowY: 'scroll',backgroundColor: 'transparent',border: "none"}}>
                {source.map(item => (
                    <img key={item.key} src={item.url} alt={item.title}  onClick={() => setSelectDelete(SelectDelete+1)} style={{maxWidth:250,maxHeight: 250 ,margin: 40,marginLeft:45,marginTop: 30,borderRadius: 10}} className='imgShade'/>
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