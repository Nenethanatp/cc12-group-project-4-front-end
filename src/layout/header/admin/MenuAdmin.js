import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../Logout';

import { getAccessToken } from '../../../utils/localStorage';
import profileImage from '../../../assets/images/profile-image.png';
import HomeIcon from '../../../components/icons/HomeIcon';
import ReportIcon from '../../../components/icons/ReportIcon';
import ProfileIcon from '../../../components/icons/ProfileIcon';
import SettingIcon from '../../../components/icons/SettingIcon';

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
        className="flex flex-col justify-between h-full w-[40%]  pt-14 px-7 pb-7 bg-slate-200 rounded-tl-3xl rounded-bl-3xl faderightside text-black"
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
          <div className="flex flex-wrap gap-4 justify-center mt-5 text-slate-500">
            <div
              className="morphIcon flex justify-center items-center"
              onClick={handleMenu}
            >
              <Link to="/">
                <HomeIcon />
              </Link>
            </div>
            <div
              className="morphIcon flex justify-center items-center text-red-500"
              onClick={handleMenu}
            >
              <Link to="/reported">
                <ReportIcon />
              </Link>
            </div>
            <div
              className="morphIcon flex justify-center items-center text-blue-500"
              onClick={handleMenu}
            >
              <Link to={`/profile/${user.id}`}>
                <ProfileIcon />
              </Link>
            </div>
            <div
              className="morphIcon flex justify-center items-center"
              onClick={handleMenu}
            >
              <Link to={`/editProfile/${user.id}`}>
                <SettingIcon />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center gap-3 text-xl font-bold border-t-2 border-gray-400 pt-3 text-slate-500">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
