import {useSelector} from "react-redux";
import Favorite from "./Favorite";

function FavoriteList({handleSetMapCenter}) {
  const favorites = useSelector((state) => state.favorite.items);

  return (
    <div className="h-full w-full">
      {favorites.map((favorite, index) => (
        <Favorite key={favorite.id} favorite={favorite} handleSetMapCenter={handleSetMapCenter}  />
      ))}
    </div>
  );

}

export default FavoriteList;