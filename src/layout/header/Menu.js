import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logout from './Logout';

import { getAccessToken } from '../../utils/localStorage';
import profileImage from '../../assets/images/profile-image.png';
import HomeIcon from '../../components/icons/HomeIcon';
import MessageIcon from '../../components/icons/MessageIcon';
import AlertIcon from '../../components/icons/AlertIcon';
import SubscribeIcon from '../../components/icons/SubscribeIcon';
import AboutIcon from '../../components/icons/AboutIcon';
import ProfileIcon from '../../components/icons/ProfileIcon';
import PaymentIcon from '../../components/icons/PaymentIcon';
import { useState } from 'react';
import ModalSubscribe from '../../features/favorite/ModalSubscribe';
import Modal from '../../components/Modal';

function Menu({ handleMenu, openChat }) {
  const handleOpenChat = () => {
    handleMenu();
    openChat();
  };
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const accessToken = getAccessToken();
  const lineloginUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=XfyZEDKOR7ihHaJwCDaqkh&redirect_uri=http://localhost:8080/user/line/callback&scope=notify&state=${accessToken}`;

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
          <div className="flex items-center gap-3 text-xl font-bold border-b-2 border-gray-300 pb-3 mb-2 ">
            <div className="w-[50px] h-[50px] bg-slate-300 rounded-[40px] "></div>
            <div>WEB</div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-5 text-slate-500">
            <button
              onClick={handleMenu}
              className="morphIcon flex justify-center items-center"
            >
              <Link to="/">
                <HomeIcon />
              </Link>
            </button>
            <div
              className="morphIcon flex justify-center items-center"
              onClick={handleOpenChat}
            >
              <MessageIcon />
            </div>
            <div
              onClick={handleMenu}
              className="morphIcon flex justify-center items-center"
            >
              <Link to="/subscription">
                <PaymentIcon />
              </Link>
            </div>
            <div className="morphIcon flex justify-center items-center">
              <AboutIcon />
            </div>
            <div className="morphIcon flex justify-center items-center">
              {status === 'subscribed' ? (
                <a target="_blank" rel="noreferrer" href={lineloginUrl}>
                  <AlertIcon />
                </a>
              ) : (
                <div
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <AlertIcon />
                </div>
              )}
            </div>
            <div className="morphIcon flex justify-center items-center">
              <Link to={`/profile/${user.id}`}>
                <ProfileIcon />
              </Link>
            </div>
            <div className="w-[80%] border-b-2 border-gray-400"></div>
            <div className="flex justify-end">
              <Logout />
            </div>

            <Modal
              open={openModal}
              content={
                <ModalSubscribe
                  closeModal={() => {
                    setOpenModal(false);
                  }}
                />
              }
              close={() => {
                setOpenModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
