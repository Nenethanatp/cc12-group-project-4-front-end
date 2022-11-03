import SearchBar from './SearchBar';
import Menu from './Menu';
import MenuAdmin from './admin/MenuAdmin';
import { useState } from 'react';
import ChatContainer from '../../features/chat/ChatContainer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className='flex justify-center items-end gap-2 w-full bg-cyan-600 p-3 px-6 h-24 shadow-md'>
      {user.role === 'admin' ? (
        <>
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
            <button className='material-symbols-outlined w-10 h-10 text-white'>
              menu
            </button>
          </div>
          <ChatContainer open={openChat} close={() => setOpenChat(false)} />
          {isMenuOpen && (
            <MenuAdmin
              handleMenu={handleMenu}
              openChat={() => setOpenChat(true)}
            />
          )}
        </>
      ) : (
        <>
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
            <button className='material-symbols-outlined w-10 h-10 text-white'>
              menu
            </button>
          </div>
          <ChatContainer open={openChat} close={() => setOpenChat(false)} />
          {isMenuOpen && (
            <Menu handleMenu={handleMenu} openChat={() => setOpenChat(true)} />
          )}
        </>
      )}
    </nav>
  );
}

export default Header;
