import PostForm from "./PostForm";
import PostList from "./PostList";

function PostContainer() {
  return (
    <>
      <button>Create Post</button>
      <PostList />
      <PostForm />
    </>
  );
}

export default PostContainer;
