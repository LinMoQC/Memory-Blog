import './index.css';

interface CheckButtonProps {
    checked: boolean;
    handleCheckBoxChange: () => void;
}

const CheckButton = ({ checked, handleCheckBoxChange }: CheckButtonProps) => {
    return (
        <label className="Check_container">
            <input checked={checked} type="checkbox" onChange={handleCheckBoxChange} />
            <div className="checkmark"></div>
        </label>
    );
};

export default CheckButton;
