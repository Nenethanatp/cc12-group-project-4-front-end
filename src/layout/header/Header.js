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
    <>
      <nav>
        <div className="p-8 bg-black bg-opacity-40">
          <SearchBar handleMenu={handleMenu} />
          {isMenuOpen && (
            <Menu handleMenu={handleMenu} openChat={() => setOpenChat(true)} />
          )}
        </div>
        <ChatContainer open={openChat} close={() => setOpenChat(false)} />
      </nav>
    </>
  );
}

export default Header;
