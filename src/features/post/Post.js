import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../api/postApi";
import { getPosts } from "../../store/postSlice";
import { formatDate } from "../../utils/formatDate";
import PostDetail from "./PostDetail";

function Post({ post }) {
  const { id, content, createdAt, PostImages, User, Likes, Comments } = post;

  const { firstName, lastName, imageUrl } = User;
  const countLike = Likes.length;
  const countComment = Comments.length;

  const dispatch = useDispatch();

  const date = formatDate(createdAt);

  const me = useSelector((state) => state.auth.user);
  const likedList = Likes.map((like) => like.userId); //[1,3,2] //userId of liked post

  const [openDetail, setOpenDetail] = useState(false);
  const [liked, setLiked] = useState(likedList.includes(me.id));
  const cbSetLike = () => {
    setLiked(!likedList.includes(me.id));
  };
  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(id);
      dispatch(getPosts());
      cbSetLike();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOption = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="mt-8">
        {openDetail ? (
          <PostDetail
            content={content}
            firstName={firstName}
            lastName={lastName}
            imageUrl={imageUrl}
            date={date}
            PostImages={PostImages}
            setOpenDetail={setOpenDetail}
            liked={liked}
            setLiked={setLiked}
            handleLike={handleLike}
            countLike={countLike}
            countComment={countComment}
            Comments={Comments}
            id={id}
          />
        ) : (
          <div
            className="flex flex-col "
            onClick={() => setOpenDetail((prev) => !prev)}
          >
            {PostImages.length !== 0 && (
              <div className="w-full h-60">
                <img
                  src={PostImages[0].imageUrl}
                  alt=""
                  className="rounded-t-3xl w-full h-full object-cover"
                ></img>
              </div>
            )}
            <div
              className={`bg-white flex flex-col p-5 gap-2 ${
                PostImages.length !== 0 ? "rounded-b-3xl" : "rounded-3xl"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">{content}</div>
                <i
                  className="fa-solid fa-ellipsis-vertical "
                  onClick={handleOption}
                ></i>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <i
                      className={`fa-regular fa-thumbs-up${
                        liked ? " text-blue-600" : ""
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
                <div className="text-sm">{date}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
