import { useState } from "react";
import Category from "../../components/Category";
import Modal from "../../components/Modal";
import PostContainer from "../post/PostContainer";
import Map from "./Map";

function MapContainer() {
  const [openPost, setOpenPost] = useState(false);

  const handleOpenPost = () => {
    setOpenPost(true);
  };

  return (
    <>
      <Category />
      <Map handleOpenPost={handleOpenPost} />
      <Modal
        open={openPost}
        content={<PostContainer />}
        close={() => setOpenPost(false)}
      ></Modal>
    </>
  );
}

export default MapContainer;
