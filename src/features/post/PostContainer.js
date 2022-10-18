import PostForm from "./PostForm";
import PostList from "./PostList";

import { useState } from 'react';

function PostContainer() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = (input) => {

    // call API create post

    // then close create post pane

    setIsCreatePostOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={handleCreatePost}>Create Post</button>
      <PostList />
      {isCreatePostOpen && <PostForm handleCreatePost={handleCreatePost} />}
    </div>
  );
}

export default PostContainer;
