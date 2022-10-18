function Menu({ handleMenu }) {
  return (
    <div className="flex  bg-black bg-opacity-40 fixed z-50  top-0 right-0 bottom-0 left-0">
      <div className="flex fixed flex-col justify-between  text-black h-full w-full  pt-14 px-7 pb-7  bg-white rounded-3xl left-14">
        <div>
          <div className="flex items-center gap-3 text-xl font-bold border-b-2 border-gray-400 pb-3   mb-2 ">
            <div className="w-[50px] h-[50px] bg-slate-300 rounded-[40px] "></div>
            <div>WEB</div>

            <button className="flex absolute right-24" onClick={handleMenu}>
              <span class="material-symbols-outlined">close</span>
            </button>
            {/** */}
          </div>
          <div>
            <div className="mb-3">Home</div>
            <div className="mb-3">Favorite</div>
            <div className="mb-3">Subscription</div>
            <div className="mb-3">About</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-xl font-bold border-t-2 border-gray-400 pt-3  mb-2">
            <div className="w-[50px] h-[50px] bg-slate-300 rounded-[40px] "></div>
            <div>John Doe</div>
          </div>
          <div className="mb-3">Go to profile</div>
          <div className="mb-3">Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
