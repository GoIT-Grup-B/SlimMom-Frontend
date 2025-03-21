import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../redux/auth/authOps';

const Header = () => {
    const selectUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleSignOut = () => {
        dispatch(signOutUser());
        navigate('/');
    
        const handleLogOutClick = () => { setIsModalOpen(true); };
    };
    
    const confirmLogout = async () => {
        try {
            setError(null);
            const result = await dispatch(signOutUser(token)).unwrap();
            if (result.success) {
                navigate('/login');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsModalOpen(false);
        }
    }

    const cancelLogout = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="header">
                <Logo />
            </div>
        </>
    );
};

export default Header;
