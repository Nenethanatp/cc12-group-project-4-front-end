import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import profileImage from '../../assets/images/profile-image.png';

function Comment({ comment }) {
  const date = formatDate(comment.createdAt);

  return (
    <div className="flex flex-col gap-2">
      <hr />
      <div className="flex gap-3 pb-0 ">
        <div className="flex">
          <Link to={`/profile/${comment.userId}`}>
            <img
              src={comment.User.imageUrl ? comment.User.imageUrl : profileImage}
              alt=""
              className="rounded-full w-[40px] h-[40px]  object-cover"
            ></img>
          </Link>
        </div>
        <div className="flex flex-col">
          <Link to={`/profile/${comment.userId}`}>
            <div className="text-md">
              {comment.User.firstName} {comment.User.lastName}
            </div>
          </Link>
          <div className="text-xs">{date}</div>
          <div className="my-3">{comment.content}</div>
          {comment.imageUrl && (
            <div className="w-full">
              <img
                src={comment.imageUrl}
                alt=""
                className="rounded-[5%] w-[16rem] my-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
