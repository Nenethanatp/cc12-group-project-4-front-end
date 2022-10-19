import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../../utils/localStorage';
import { logout } from '../../store/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
