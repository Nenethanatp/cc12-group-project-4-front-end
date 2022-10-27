import Comment from "./Comment";
import CommentForm from "./CommentForm";

function PostDetailComment({ post, liked, handleLike }) {
  const sortComments = [...post.Comments];
  if (sortComments) {
    sortComments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="flex items-center gap-1 text-sm">
            <i
              className={`fa-regular fa-thumbs-up${
                liked ? " text-blue-600" : ""
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
      {sortComments.length > 0 &&
        sortComments.map((comment, index) => (
          <Comment key={comment.id} comment={comment} />
        ))}

      <CommentForm id={post.id} />
    </>
  );
}

export default PostDetailComment;
