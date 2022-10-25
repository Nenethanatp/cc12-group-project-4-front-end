import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/postSlice';
import Post from './Post';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.items);
  // console.log(posts);

  return (
    <div className="w-full">
      {posts.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
