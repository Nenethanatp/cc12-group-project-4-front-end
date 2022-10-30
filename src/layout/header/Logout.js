import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../../utils/localStorage';
import { logout } from '../../store/authSlice';
import { resetEndDate } from '../../store/subscribeSlice';
import { Link } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
    dispatch(resetEndDate());
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
