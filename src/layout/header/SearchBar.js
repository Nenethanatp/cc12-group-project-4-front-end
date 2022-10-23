function SearchBar({ handleMenu }) {
  return (
    <div className="flex justify-center items-center gap-2 ">
      <div className="flex justify-center relative gap-2">
        <input
          className="w-60 h-10 bg-slate-200 flex justify-center rounded-[20px] p-2 "
          placeholder="Search here"
        />
        <span className="absolute material-symbols-outlined right-2 top-2 text-gray-400 select-none">
          search
        </span>
      </div>
      <div className="flex items-center " onClick={handleMenu}>
        <button className="material-symbols-outlined bg-slate-200 rounded-3xl w-10 h-10">
          menu
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
