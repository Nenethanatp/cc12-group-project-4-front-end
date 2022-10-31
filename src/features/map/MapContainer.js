import { useState } from 'react';
import Category from '../../components/Category';
import Modal from '../../components/Modal';
import PostContainer from '../post/PostContainer';
import FavoriteContainer from '../favorite/FavoriteContainer';
import Map from './Map';

function MapContainer() {
  const [openPost, setOpenPost] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);

  const [mapCenter, setMapCenter] = useState({ lat: 13.75, lng: 100.5 });

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
    <>
      <div>
        <Category setOpenFavorite={() => setOpenFavorite(true)} />
      </div>

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
    </>
  );
}

export default MapContainer;
