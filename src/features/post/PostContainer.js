import { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/postSlice';

function PostContainer() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleCreatePost = () => {
    setIsCreatePostOpen((prev) => !prev);
  }

  const handleCreatePost = (input) => {
    const formData = new FormData();
    formData.append("content", input.content);
    formData.append("typeId", input.typeId);
    formData.append("userId", input.userId);
    formData.append("latitude", input.latitude);
    formData.append("longitude", input.longitude);
    for (let i=0; i<input.postImages.length; i++) {
      formData.append("postImage", input.postImages[i]);
    }    
    dispatch(createPost(formData));
    // then close create post pane
    toggleCreatePost();
  };

  return (
    <div className="h-full">
      <div className=" mt-52 bg-slate-200  rounded-t-3xl flex justify-center p-6 relative">
        <div className="w-full flex flex-col items-center gap-6 ">
          <button
            className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-[100%]"
            onClick={toggleCreatePost}
          >
            CREATE POST
          </button>
          <PostList />
        </div>
        {isCreatePostOpen && <PostForm handleCreatePost={handleCreatePost} toggleCreatePost={toggleCreatePost} />}
      </div>
    </div>
  );
}

export default PostContainer;
