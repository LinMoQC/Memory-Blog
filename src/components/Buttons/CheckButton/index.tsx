import './index.css';
import React from "react";

interface CheckButtonProps {
    checked: boolean;
    handleCheckBoxChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
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
