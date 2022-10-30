import SearchBar from './SearchBar';
import Menu from './Menu';
import { useState } from 'react';
import ChatContainer from '../../features/chat/ChatContainer';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className='flex justify-center items-center gap-2 w-full bg-cyan-600 px-5 pt-12 pb-5'>
      <div id='logo'>
        <Link to='/'>
          <img
            src='/logo-placeholder.png'
            alt='Logo'
            style={{ maxHeight: '50px' }}
          />
        </Link>
      </div>
      <SearchBar />
      <div className='flex items-center' onClick={handleMenu}>
        <button className='material-symbols-outlined m-2 text-white text-3xl'>
          menu
        </button>
      </div>
      <ChatContainer open={openChat} close={() => setOpenChat(false)} />
      {isMenuOpen && (
        <Menu handleMenu={handleMenu} openChat={() => setOpenChat(true)} />
      )}
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
