import React from 'react';

const Logo = () => {
    const handleClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="logo" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                ><use href='../../../public/logo.svg'></use>
            </svg>
        </div>
    );
};

export default Logo;
