import SearchBar from './SearchBar';
import Menu from './Menu';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav>
        <div className='m-8'>
          <SearchBar handleMenu={handleMenu} />
          {isMenuOpen && <Menu handleMenu={handleMenu} />}
        </div>
      </nav>
    </>
  );
}

export default Header;
