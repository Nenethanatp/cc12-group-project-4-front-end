import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logout from "./Logout";

import { getAccessToken } from "../../utils/localStorage";
import profileImage from "../../assets/images/profile-image.png";
import HomeIcon from "../../components/icons/HomeIcon";
import MessageIcon from "../../components/icons/MessageIcon";
import AlertIcon from "../../components/icons/AlertIcon";
import SubscribeIcon from "../../components/icons/SubscribeIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import PaymentIcon from "../../components/icons/PaymentIcon";
import { useState } from "react";
import ModalSubscribe from "../../features/favorite/ModalSubscribe";
import Modal from "../../components/Modal";
import justLogo from "../../assets/images/justlogo.png";
import name from "../../assets/images/name.png";

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
      className="flex bg-black bg-opacity-40 fixed top-0 right-0 bottom-0 left-0 justify-end z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between h-full w-[40%]  pt-14 px-7 pb-7 bg-slate-200 rounded-tl-3xl rounded-bl-3xl faderightside text-black"
      >
        <div>
          <div className="flex items-center text-xl font-bold border-b-2 border-gray-300 pb-3 mb-2 ">
            <img src={justLogo} alt="logo" className="w-[100px] h-[50px]" />

            <div>
              <img src={name} alt="logo" className="w-[100px]" />
            </div>
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
              {status === "subscribed" ? (
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
            <div
              onClick={handleMenu}
              className="morphIcon flex justify-center items-center"
            >
              <Link to={`/profile/${user.id}`}>
                <ProfileIcon />
              </Link>
            </div>
            <div className="flex flex-col h-[200px] justify-end gap-5">
              <div className="w-full border-b-2 border-gray-400"></div>
              <div className="flex justify-end">
                <Logout />
              </div>
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
