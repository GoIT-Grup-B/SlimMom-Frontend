import React, { useState } from 'react';
import Logo from '../../../public/logo.svg';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('Nic');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Logo />

        {!isLoggedIn ? (
          // Kullanıcı girişi yokken
          <div className="ml-8 flex space-x-4">
            <button className="uppercase text-gray-300" onClick={handleLogin}>
              Log In
            </button>
            <button className="uppercase text-gray-300">Registration</button>
          </div>
        ) : (
          // Kullanıcı girişi varsa
          <>
            <div className="hidden lg:flex space-x-4">
              <button className="uppercase text-gray-300">Diary</button>
              <button className="uppercase text-gray-300">Calculator</button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden md:block uppercase">{username}</span>
              <button
                className="uppercase text-gray-300"
                onClick={handleLogout}
              >
                Exit
              </button>
            </div>
          </>
        )}
      </div>

      <div className="lg:hidden flex items-center">
        <button className="uppercase text-gray-300" onClick={toggleMenu}>
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isMenuOpen && isLoggedIn && (
        <div className="lg:hidden absolute top-16 right-4 bg-gray-700 text-white p-4 space-y-4">
          <button className="uppercase text-gray-300">Diary</button>
          <button className="uppercase text-gray-300">Calculator</button>
          <button className="uppercase text-gray-300" onClick={handleLogout}>
            Exit
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
