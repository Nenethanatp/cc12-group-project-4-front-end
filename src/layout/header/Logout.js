import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../../utils/localStorage';
import { logout } from '../../store/authSlice';
import { Link } from 'react-router-dom';
import LogoutIcon from '../../components/icons/LogoutIcon';

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
  };
  return (
    <div
      onClick={handleLogout}
      className='morphIcon flex justify-center items-center'
    >
      <Link to='/'>
        <LogoutIcon />
      </Link>
    </div>
  );
}

export default Logout;
