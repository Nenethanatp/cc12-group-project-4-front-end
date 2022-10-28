import { useSelector } from 'react-redux';

import Post from './Post';

function PostList() {
  const location = useSelector((state) => state.map.location);
  const posts = useSelector((state) => state.post.items);

  let filteredPosts = [];

  if (location) {
    filteredPosts = posts.filter(post => +post.Location.latitude === location.latitude && +post.Location.longitude === location.longitude);
    console.log(filteredPosts);
  }

  return (
    <div className="h-full w-full">
      {filteredPosts.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
