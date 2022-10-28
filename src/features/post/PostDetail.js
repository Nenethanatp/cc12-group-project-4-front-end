import { useEffect, useState } from 'react';
import { getPosts, getPostById } from '../../store/postSlice';
import { formatDate } from '../../utils/formatDate';
import { toggleLike, toggleReport } from '../../api/postApi';
import * as postService from '../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostDetailGallery from './PostDetailGallery';
import PostDetailComment from './PostDetailComment';

function PostDetail() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [post, setPost] = useState({
    User: {
      firstName: '',
      lastName: '',
    },
    PostImages: [],
    Likes: [],
    Comments: [],
  });
  const me = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.items);

  const likedList = post?.Likes?.map((like) => like.userId);
  const liked = likedList?.includes(me.id);

  useEffect(() => {
    setPost(posts.find((post) => post.id === Number(postId)));
  }, [posts, postId]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(post.id);
      dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {post && (
        <div className="bg-white flex flex-col p-5 gap-2 rounded-b-3xl">
          <div className="flex gap-3 ">
            <div className="">
              {post.User && (
                <img
                  src={post.User.imageUrl}
                  alt=""
                  className="bg-orange-500 rounded-full w-[40px] h-[40px]  object-cover"
                ></img>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-md">{`${post.User.firstName} ${post.User.lastName}`}</div>
            </div>
          </div>

          <div className="text-lg font-semibold mt-5">{post.content}</div>

          {post && <PostDetailGallery post={post}></PostDetailGallery>}

          <div className="text-xs">{formatDate(post.createdAt)}</div>

          {post && (
            <PostDetailComment
              post={post}
              liked={liked}
              handleLike={handleLike}
            ></PostDetailComment>
          )}
        </div>
      )}
    </>
  );
}

export default PostDetail;
