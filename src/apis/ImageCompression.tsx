import {message, UploadFile} from 'antd';

const compressImage = async (file: File, maxWidth: number, maxHeight: number, quality: number) => {
    return new Promise<File>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const target = event.target;
            if (target && target.result && typeof target.result === 'string') {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const compressedFile = new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            } else {
                                reject(new Error('无法获取图像数据'));
                            }
                        }, 'image/jpeg', quality);
                    } else {
                        reject(new Error('无法获取画布上下文'));
                    }
                };
                img.src = target.result;
            } else {
                reject(new Error('无效的文件格式'));
            }
        };
        reader.readAsDataURL(file);
    });
};

const ImageCompression = async (file: File | UploadFile) => {
    const MAX_WIDTH = 800;
    const MAX_HEIGHT = 600;
    const COMPRESSION_QUALITY = 0.7;

    try {
        const compressedFile = await compressImage(file as File, MAX_WIDTH, MAX_HEIGHT, COMPRESSION_QUALITY);
        return compressedFile;
    } catch (error) {
        message.error('图片压缩失败');
        throw error;
    }
};

export default ImageCompression;
