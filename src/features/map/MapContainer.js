import { useEffect, useMemo, useState } from "react";
import Category from "../../components/Category";
import Modal from "../../components/Modal";
import PostContainer from "../post/PostContainer";
import FavoriteContainer from "../favorite/FavoriteContainer";
import Map from "./Map";
import CurrentButton from "./CurrentButton";

function MapContainer() {
  const [openPost, setOpenPost] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 13.75, lng: 100.5 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => setMyLocation(null)
    );
  }, []);

  const handleOpenPost = () => {
    setOpenPost(true);
  };

  const handleSetMapCenter = (input) => {
    // console.log(input);
    setMapCenter({
      lat: +input.latitude,
      lng: +input.longitude,
    });
  };

  const handleClickMyLocation = () => {
    setMapCenter(myLocation);
  };

  return (
    <div>
      <Category setOpenFavorite={() => setOpenFavorite(true)} />
      <Map handleOpenPost={handleOpenPost} mapCenter={mapCenter} />
      <Modal
        open={openPost}
        content={<PostContainer />}
        close={() => setOpenPost(false)}
      ></Modal>
      <Modal
        open={openFavorite}
        content={<FavoriteContainer handleSetMapCenter={handleSetMapCenter} />}
        close={() => setOpenFavorite(false)}
      ></Modal>
    </div>
  );
}

export default MapContainer;
