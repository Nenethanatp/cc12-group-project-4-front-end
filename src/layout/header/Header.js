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
        <div className="p-8 bg-black bg-opacity-40">
          <SearchBar handleMenu={handleMenu} />
          {isMenuOpen && <Menu handleMenu={handleMenu} />}
        </div>
      </nav>
    </>
  );
}

export default Header;
