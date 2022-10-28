import { useSelector } from 'react-redux';

import Post from './Post';

function PostList({ myPosts }) {
  const location = useSelector((state) => state.map.location);
  const posts = useSelector((state) => state.post.items);

  let filteredPosts = [];

  if (location) {
    filteredPosts = posts.filter(
      (post) =>
        +post.Location.latitude === location.latitude &&
        +post.Location.longitude === location.longitude
    );
    console.log(filteredPosts);
  }
  console.log(myPosts);
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
