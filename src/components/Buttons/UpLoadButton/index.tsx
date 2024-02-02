import './index.css';
import img from '../../../assets/uploadImg.png'
interface UpLoadButtonProps {
    onClick: () => void;
}

const UpLoadButton = ({ onClick }: UpLoadButtonProps) => {
    return (
        <button className="select" onClick={onClick}>
            <span className="text">上传</span>
            <span className="icon">
                <img src={img} alt="" />
            </span>
        </button>
    );
};

export default UpLoadButton;
