import FavoriteList from "./FavoriteList";

function FavoriteContainer({handleSetMapCenter}) {


  return (
    <>
      <div className="h-full">
        <div className="bg-slate-200 h-full rounded-t-3xl p-6 relative">
          <div className="grid grid-cols-2 gap-4">
          </div>
          <FavoriteList handleSetMapCenter={handleSetMapCenter} />
        </div>
      </div>
    </>
  );
}

export default FavoriteContainer;
