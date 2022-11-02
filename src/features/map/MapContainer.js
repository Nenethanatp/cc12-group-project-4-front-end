import { useState } from "react";
import Category from "../../components/Category";
import Modal from "../../components/Modal";
import PostContainer from "../post/PostContainer";
import FavoriteContainer from "../favorite/FavoriteContainer";
import Map from "./Map";
import ModalSubscribe from "../favorite/ModalSubscribe";

function MapContainer() {
  const [openPost, setOpenPost] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [openSubscribe, setOpenSubscribe] = useState(false);

  const handleOpenPost = () => {
    setOpenPost(true);
  };

  const handleCloseFavorite = () => {
    setOpenFavorite(false);
  };

  return (
    <div>
      <Category
        setOpenFavorite={() => setOpenFavorite(true)}
        setOpenSubscribe={() => {
          setOpenSubscribe(true);
        }}
      />
      <Map handleOpenPost={handleOpenPost} />
      <Modal
        open={openPost}
        content={<PostContainer />}
        close={() => setOpenPost(false)}
      ></Modal>
      <Modal
        open={openFavorite}
        content={
          <FavoriteContainer handleCloseFavorite={handleCloseFavorite} />
        }
        close={handleCloseFavorite}
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
