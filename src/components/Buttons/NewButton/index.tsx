import React from 'react';
import './index.css';

interface NewButtonProps {
    onClick: () => void;
}

const NewButton: React.FC<NewButtonProps> = ({ onClick }) => {
    return (
        <button className="select" onClick={onClick}>
            <span className="text">添加</span>
            <span className="iconNew">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="45" fontWeight="bold">+</text>
                </svg>
            </span>
        </button>
    );
};

export default NewButton;
