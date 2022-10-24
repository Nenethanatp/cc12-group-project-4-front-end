import SearchBar from "./SearchBar";
import Menu from "./Menu";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-center items-center gap-2 w-full bg-red-500 p-3  px-6">
      <SearchBar />
      <div className="flex items-center " onClick={handleMenu}>
        <button className="material-symbols-outlined bg-white rounded-3xl w-8 h-8">
          menu
        </button>
      </div>
      {isMenuOpen && <Menu handleMenu={handleMenu} />}
    </nav>
  );
}

export default Header;
