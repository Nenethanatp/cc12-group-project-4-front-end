import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import profileImage from '../../assets/images/profile-image.png';
import { Link } from 'react-router-dom';

function PostDetail({
  id,
  post,
  firstName,
  lastName,
  imageUrl,
  date,
  PostImages,
  setOpenDetail,
  liked,
  setLiked,
  handleLike,
  content,
  countLike,
  countComment,
  Comments,
}) {
  const sortComments = [...Comments];
  if (sortComments) {
    sortComments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }

  return (
    <div className="flex flex-col ">
      {PostImages.length !== 0 ? (
        <div className="w-full relative">
          <i
            className="fa-solid fa-circle-chevron-left opacity-90 text-3xl absolute top-3 left-3"
            onClick={() => setOpenDetail((prev) => !prev)}
          />
          <img
            src={PostImages[0].imageUrl}
            alt=""
            className="rounded-t-3xl w-full object-cover"
          ></img>
        </div>
      ) : (
        <div
          className="w-full relative bg-white rounded-t-3xl "
          onClick={(e) => e.stopPropagation()}
        >
          <i
            className="fa-solid fa-circle-chevron-left opacity-90  h-full  text-2xl py-3 pl-3"
            onClick={() => setOpenDetail((prev) => !prev)}
          />
          <hr />
        </div>
      )}
      <div className="bg-white flex flex-col p-5 gap-2 rounded-b-3xl">
        <div className="flex gap-3 ">
          <div>
            <Link to={`/profile/${post.User.id}`}>
              <img
                src={imageUrl ? imageUrl : profileImage}
                alt=""
                className="rounded-full w-[40px] h-[40px]  object-cover"
              ></img>
            </Link>
          </div>
          <div className="flex flex-col">
            <Link to={`/profile/${post.User.id}`}>
              <div className="text-md">{`${firstName} ${lastName}`}</div>
            </Link>
            <div className="text-xs">{date}</div>
          </div>
        </div>
        <div className="text-lg font-semibold">{content}</div>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-1 text-sm">
              <i
                className={`fa-regular fa-thumbs-up${
                  liked ? ' text-blue-600' : ''
                }`}
                onClick={handleLike}
              />
              <div>{countLike}</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <i className="fa-regular fa-message " />
              <div>{countComment}</div>
            </div>
          </div>
        </div>
        {sortComments.map((comment, index) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        <CommentForm id={id} />
      </div>
    </div>
  );
}

export default PostDetail;
