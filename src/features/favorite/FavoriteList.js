import {useSelector} from "react-redux";
import Favorite from "./Favorite";

function FavoriteList({handleSetMapCenter}) {
  const favorites = useSelector((state) => state.favorite.items);

  return (
    <div className="h-full w-full">
      <div style={{ minHeight: "40px" }}>
        <div className="material-symbols-outlined rounded-full bg-amber-100 float-left">star</div>
        <div className="pl-3 font-semibold text-xl float-left">My Favorites</div>
      </div>
      {favorites.map((favorite, index) => (
        <Favorite key={favorite.id} favorite={favorite} handleSetMapCenter={handleSetMapCenter}/>
      ))}
    </div>
  );

}

export default FavoriteList;