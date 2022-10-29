import { useSelector } from "react-redux";

import Post from "./Post";

function PostList({ myPosts }) {
  const postLocationIds = useSelector((state) => state.map.postLocationIds);
  const posts = useSelector((state) => state.post.items);

  const filteredPosts = posts.filter((post) =>
    postLocationIds.includes(post.Location.id)
  );

  return (
    <>
      {myPosts ? (
        <div className="h-full w-full">
          {myPosts.map((post, index) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="h-full w-full">
          {filteredPosts.map((post, index) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostList;
