import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../../utils/localStorage';
import { logout } from '../../store/authSlice';
import { Link } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
  };
  return (
    <Link to="/">
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Link>
  );
}

export default Logout;
