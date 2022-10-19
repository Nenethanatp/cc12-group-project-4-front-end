import { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

function PostContainer() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = (input) => {
    // call API create post

    // then close create post pane

    setIsCreatePostOpen((prev) => !prev);
  };

  return (
    <div className="h-full">
      <div className=" mt-52 bg-slate-200  rounded-t-3xl flex justify-center p-6 relative">
        <div className="w-full flex flex-col items-center gap-6 ">
          <button
            className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-[100%]"
            onClick={handleCreatePost}
          >
            CREATE POST
          </button>
          <PostList />
        </div>
        {isCreatePostOpen && <PostForm handleCreatePost={handleCreatePost} />}
      </div>
    </div>
  );
}

export default PostContainer;
