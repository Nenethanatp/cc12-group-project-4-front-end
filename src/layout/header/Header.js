import SearchBar from './SearchBar';
import Menu from './Menu';
import { useState } from 'react';
import ChatContainer from '../../features/chat/ChatContainer';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-center items-center gap-2 w-full bg-red-500 p-3 px-6">
      <SearchBar />
      <div className="flex items-center" onClick={handleMenu}>
        <button className="material-symbols-outlined bg-white rounded-3xl w-8 h-8">
          menu
        </button>
      </div>
      <ChatContainer open={openChat} close={() => setOpenChat(false)} />
      {isMenuOpen && <Menu handleMenu={handleMenu} openChat={() => setOpenChat(true)} />}
    </nav>

    // <>
    //   <nav>
    //     <div className="p-8 bg-black bg-opacity-40">
    //       <SearchBar handleMenu={handleMenu} />
    //       {isMenuOpen && (
    //         <Menu handleMenu={handleMenu} openChat={() => setOpenChat(true)} />
    //       )}
    //     </div>
    //     <ChatContainer open={openChat} close={() => setOpenChat(false)} />
    //   </nav>
    // </>
  );
}

export default Header;
