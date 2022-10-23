import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Menu({ handleMenu, openChat }) {
  const handleOpenChat = () => {
    handleMenu();
    openChat();
  };
  const user = useSelector((state) => state.auth.user);

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
          <div className="flex items-center gap-3 text-xl font-bold border-b-2 border-gray-400 pb-3 mb-2 ">
            <div className="w-[50px] h-[50px] bg-slate-300 rounded-[40px] "></div>
            <div>WEB</div>
          </div>
          <div>
            <div className="mb-3">Home</div>
            <div className="mb-3" onClick={handleOpenChat}>
              Messages
            </div>
            <div className="mb-3">Favorite</div>
            <div className="mb-3">Subscription</div>
            <div className="mb-3">About</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-xl font-bold border-t-2 border-gray-400 pt-3  mb-2">
            <div className="w-[50px] w- h-[50px] bg-slate-300 rounded-[40px] object-fill">
              <img
                src={user.imageUrl}
                alt=""
                className="w-[50px] w- h-[50px] bg-slate-300 rounded-[40px] object-fill"
              />
            </div>
            <Link to={`/profile/${user.id}`}>
              <div
                onClick={handleMenu}
              >{`${user.firstName} ${user.lastName}`}</div>
            </Link>
          </div>
          <Link to={`/profile/${user.id}`}>
            <div className="mb-3" onClick={handleMenu}>
              Go to profile
            </div>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Menu;
