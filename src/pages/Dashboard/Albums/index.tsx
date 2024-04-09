import InfiniteScroll from 'react-infinite-scroll-component';
import './index.sass'
import { Card, Modal, UploadFile} from "antd";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import UpLoadButton from "../../../components/Buttons/UpLoadButton";
import {useCallback, useEffect, useState} from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import CheckButton from "../../../components/Buttons/CheckButton";
import {ImgUrl} from "../../../interface/ImgTypes";
import {delImages, getImageList, uploadImages} from "../../../apis/ImageMethods.tsx";
import ImageCompression from "../../../apis/ImageCompression.tsx";


const Albums = () => {
    //状态变量区
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
    const [SelectDelete,setSelectDelete] = useState(0)
    const [checkStatus, setCheckStatus] = useState<Record<string, boolean>>({});
    const [staticDate, setStaticDate] = useState<ImgUrl[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModaldelOpen, setIsDelModalOpen] = useState(false);


    useEffect(() => {
        initImageList()
    },[])


    // 获取图片列表
    const initImageList = () => {
        getImageList().then((res) => {
            setStaticDate(res.data.data)
        }).catch((error) => {
            throw error
        })
    }

    //回调函数区域
    const fetchData = async () => {

    };

    const Delete = useCallback(() => {
        // @ts-ignore
        //拿出所有的键
        const keysToDelete = Object.keys(checkStatus).filter(key => checkStatus[key]);

        delImages(keysToDelete).then((res) => {
            if(res.status === 200){
                initImageList()
                message.success("删除成功");
                // 删除完毕后清空 checkStatus
                setCheckStatus({});
                setSelectDelete(0);
            }
        }).catch((error) => {
            message.error("删除失败：" + error)
            // 删除完毕后清空 checkStatus
            setCheckStatus({});
            setSelectDelete(0);
        })
    }, [SelectDelete, checkStatus]);

    // 触发选择框和图片点击
    const handleItemClick = (img: ImgUrl) => {
        // 检查当前图片对应的复选框状态
        const isChecked = checkStatus[img.imageUrl] || false;

        // 更新复选框状态
        setCheckStatus(prevState => ({
            ...prevState,
            [img.imageUrl]: !isChecked // 切换复选框状态
        }));

        // 更新选择的数量
        setSelectDelete(prevCount => isChecked ? prevCount - 1 : prevCount + 1);
    };
    //上传悬浮框
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
        customRequest: async (req) => {
            // @ts-ignore
            const compressedFile = await ImageCompression(req.file);
            const formData = new FormData();
            formData.append('file', compressedFile);
            uploadImages(formData).then((res) => {
                if (res.status === 200) {
                    initImageList();
                    // @ts-ignore
                    message.success(`${req.file.name} 图片上传成功`);
                }
            }).catch((error) => {
                message.error('上传失败' + error);
            });

        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const showdelModal = () => {
        if(SelectDelete === 0){
            message.warning("待选中")
            return
        }else {
            setIsDelModalOpen(true);
        }
    };

    const handledelOk = () => {
        Delete()
        setIsDelModalOpen(false);
    };

    const handledelCancel = () => {
        setIsDelModalOpen(false);
    };


    return <div style={{height: '100%'}} className='allin'>
        <InfiniteScroll
        dataLength={staticDate.length}
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
                    <div onClick={showdelModal}>
                        <DeleteButton />
                    </div>
                </div>
            </div>
            <Card style={{ width: '100%', height: '86vh', marginLeft: '0%', marginTop: '0%', overflowY: 'scroll', backgroundColor: 'transparent', border: "none" }}>
                {staticDate.map(item => (
                    <div key={item.imageKey} style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{ position: 'absolute', top: 30, right: 40, transform: 'scale(0.8)',zIndex: 3 }}>
                            <CheckButton
                                checked={checkStatus[item.imageUrl] || false}
                                handleCheckBoxChange={() => handleItemClick(item)}
                            />
                        </div>
                        <img
                            src={item.imageUrl}
                            onClick={() => handleItemClick(item)}
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

        <Modal title="删除确认" open={isModaldelOpen} onOk={handledelOk} onCancel={handledelCancel}  okText="确定" cancelText="取消">
            是否删除选中所有图片?
        </Modal>
    </div>
}

export default Albums