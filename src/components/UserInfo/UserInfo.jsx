import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOps';
import LogoutModal from '../LogoutModal/LogoutModal';

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useSelector((state) => state.auth.user?.name);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="font-semibold text-gray-700">{username}</span>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
      >
        Exit
      </button>

      {isModalOpen && (
        <LogoutModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default UserInfo;
