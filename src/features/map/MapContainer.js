import { useEffect, useState } from "react";
import Category from "../../components/Category";
import Modal from "../../components/Modal";
import PostContainer from "../post/PostContainer";
import FavoriteContainer from "../favorite/FavoriteContainer";
import Map from "./Map";
import { toast } from "react-toastify";
import ModalSubscribe from "../favorite/ModalSubscribe";

function MapContainer() {
  const [openPost, setOpenPost] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 13.75, lng: 100.5 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => toast.error("can not get your location")
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

  return (
    <div>
      <Category
        setOpenFavorite={() => setOpenFavorite(true)}
        setOpenSubscribe={() => {
          setOpenSubscribe(true);
        }}
      />
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

      <Modal
        open={openSubscribe}
        content={
          <ModalSubscribe
            closeModal={() => {
              setOpenSubscribe(false);
            }}
          />
        }
        close={() => setOpenSubscribe(false)}
      ></Modal>
    </div>
  );
}

export default MapContainer;
