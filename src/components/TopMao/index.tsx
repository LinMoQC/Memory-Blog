import './index.sass';
import React from 'react';

interface TopMaoProps {
    currentScrollHeight: number;
}

const TopMao: React.FC<TopMaoProps> = ({ currentScrollHeight }) => {
    const BackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className={`TopMao ${currentScrollHeight > 500 ? 'TopMaoShow' : ''} shake`} onClick={BackToTop}></div>
    );
};

export default TopMao;
