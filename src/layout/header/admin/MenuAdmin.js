import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../Logout';

import { getAccessToken } from '../../../utils/localStorage';
import profileImage from '../../../assets/images/profile-image.png';

function Menu({ handleMenu }) {
  const handleOpenChat = () => {
    handleMenu();
  };
  const user = useSelector((state) => state.auth.user);

  const accessToken = getAccessToken();

  return (
    <div
      onClick={handleMenu}
      className="flex  bg-black bg-opacity-40 fixed z-50  top-0 right-0 bottom-0 left-0 justify-end "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between  text-black h-full w-[80%]  pt-14 px-7 pb-7  bg-white rounded-tl-3xl rounded-bl-3xl faderightside"
      >
        <div>
          <div
            className="flex items-center gap-3 text-xl font-bold border-b-2 border-gray-400 pb-3 mb-2 "
            onClick={handleMenu}
          >
            <div id="logo">
              <Link to="/">
                <img
                  src="/logo-placeholder.png"
                  alt="Logo"
                  style={{ maxHeight: '50px' }}
                />
              </Link>
            </div>
            <div>WEB</div>
          </div>
          <div>
            <Link to="/">
              <div className="mb-3" onClick={handleMenu}>
                Home
              </div>
            </Link>
            <Link to="/reported">
              <div className="mb-3" onClick={handleMenu}>
                Reported
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-xl font-bold border-t-2 border-gray-400 pt-3  mb-2">
            <Link to={`/editProfile/${user.id}`}>
              <div
                className="w-[50px] w- h-[50px] bg-slate-300 rounded-[40px] object-cover"
                onClick={handleMenu}
              >
                <img
                  src={user.imageUrl ? user.imageUrl : profileImage}
                  alt=""
                  className="w-[50px] w- h-[50px] bg-slate-300 rounded-[40px] object-cover"
                />
              </div>
            </Link>
            <Link to={`/editProfile/${user.id}`}>
              <div
                onClick={handleMenu}
              >{`${user.firstName} ${user.lastName}`}</div>
            </Link>
          </div>
          <Link to={`/editProfile/${user.id}`}>
            <div className="mb-3" onClick={handleMenu}>
              Go to edit info
            </div>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Menu;
