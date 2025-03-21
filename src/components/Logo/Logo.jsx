import React from 'react';

const Logo = () => {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src="../../../public/logo.svg" />
    </div>
  );
};

export default Logo;
