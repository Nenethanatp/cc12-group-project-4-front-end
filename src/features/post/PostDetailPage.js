import { useEffect, useState } from 'react';
import { getPosts, getPostById } from "../../store/postSlice";
import Comment from './Comment';
import CommentForm from './CommentForm';
import { toggleLike, toggleReport } from "../../api/postApi";
import * as postService from '../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
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
  const likedList = post.Likes.map((like) => like.userId);
  const [liked, setLiked] = useState(likedList.includes(me.id));

  useEffect(() => {
    setPost(posts.find(post => post.id === Number(postId)));
  }, [posts, postId])

  useEffect(() => {
    console.log(post);
  }, [post])

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(post.id);
      dispatch(getPosts());
      setLiked(!likedList.includes(me.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      { post && 
      <div className="bg-white flex flex-col p-5 gap-2 rounded-b-3xl">
        <div className="flex gap-3 ">
          <div className="">
            { post.User &&
            <img
              src={post.User.imageUrl}
              alt=""
              className="rounded-full w-[40px] h-[40px]  object-cover"
            ></img>
            }
          </div>
          <div className="flex flex-col">
            <div className="text-md">{`${post.User.firstName} ${post.User.lastName}`}</div>
            <div className="text-xs">{post.date}</div>
          </div>
        </div>

        <div className="text-lg font-semibold">{post.content}</div>

        <div>
          { post.PostImages.length && post.PostImages.map((posterImage, index) => { 
            return (<div key={index}>
              <img className='w-[30%]' key={index} src={posterImage.imageUrl} alt={post.content} />
            </div>)
          })} 
        </div>

        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-1 text-sm">
              <i
                className={`fa-regular fa-thumbs-up${
                  liked ? ' text-blue-600' : ''
                }`}
                onClick={handleLike}
              />
              <div>{post.Likes.length}</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <i className="fa-regular fa-message " />
              <div>{post.Comments.length}</div>
            </div>
          </div>
        </div>
        {post.Comments.length > 0 && post.Comments.map((comment, index) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        
        <CommentForm id={post.id} />
      </div>
      }
    </>
  );
}

export default PostDetailPage;
