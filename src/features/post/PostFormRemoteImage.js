import { useDispatch } from 'react-redux';
import {destroyPostImage} from "../../store/postSlice";

function PostFormRemoteImage({ postImage, post }) {
  const dispatch = useDispatch();

  const handleDeletePhoto = (e) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(destroyPostImage(post.id, postImage.id));
    }
  };

  return (
    <div className="relative">
      <i
        className="fa-solid fa-xmark absolute top-3 right-2 w-[20px] "
        style={{cursor: 'pointer'}}
        onClick={handleDeletePhoto}
      />

      <img
        src={postImage.imageUrl}
        className="img-fluid mt-2"
        alt="post"
      />
    </div>
  );
}

export default PostFormRemoteImage;
