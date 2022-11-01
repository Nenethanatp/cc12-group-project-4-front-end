import { useState } from "react";
import PostForm from "./PostForm";
import AddFavoriteForm from "./AddFavoriteForm";
import PostList from "./PostList";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/postSlice";
import { createFavorite } from "../../store/favoriteSlice";
import Modal from "../../components/Modal";

function PostContainer() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAddFavoriteOpen, setIsAddFavoriteOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleCreatePost = () => {
    setIsCreatePostOpen((prev) => !prev);
  };

  const toggleAddFavorite = () => {
    setIsAddFavoriteOpen((prev) => !prev);
  };

  const handleCreatePost = (input) => {
    const formData = new FormData();
    formData.append("content", input.content);
    formData.append("typeId", input.typeId);
    formData.append("userId", input.userId);
    formData.append("latitude", input.latitude);
    formData.append("longitude", input.longitude);
    for (let i = 0; i < input.postImages.length; i++) {
      formData.append("postImage", input.postImages[i]);
    }
    // console.log(formData);
    dispatch(createPost(formData));
    // then close create post pane
    toggleCreatePost();
  };

  const handleAddFavorite = (input) => {
    dispatch(createFavorite(input));
    toggleAddFavorite();
  };

  return (
    <>
      <div className="h-auto min-h-[70vh] bg-slate-200 rounded-t-3xl p-6 relative">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <button
              className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-full"
              onClick={toggleCreatePost}
            >
              CREATE POST
            </button>
          </div>
          <div>
            <button
              className="bg-slate-50 rounded-3xl p-3 text-lg font-semibold w-full"
              onClick={toggleAddFavorite}
            >
              ADD FAVORITE
            </button>
          </div>
        </div>

        <PostList />
      </div>

      <Modal
        open={isCreatePostOpen}
        content={
          <PostForm
            handleCreatePost={handleCreatePost}
            toggleCreatePost={toggleCreatePost}
          />
        }
        close={toggleCreatePost}
      />

      <Modal
        open={isAddFavoriteOpen}
        content={
          <AddFavoriteForm
            handleAddFavorite={handleAddFavorite}
            toggleAddFavorite={toggleAddFavorite}
          />
        }
        close={toggleCreatePost}
      />
    </>
  );
}

export default PostContainer;
