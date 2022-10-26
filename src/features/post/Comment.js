import { formatDate } from '../../utils/formatDate';

function Comment({ comment }) {
  // console.log(comment);
  const date = formatDate(comment.createdAt);
  return (
    <div className="flex flex-col gap-2">
      <hr />
      <div className="flex gap-3 pb-0 ">
        <div className="">
          <img
            src={comment.User.imageUrl}
            alt=""
            className="rounded-full w-[40px] h-[40px]  object-cover"
          ></img>
        </div>
        <div className="flex flex-col">
          <div className="text-md">
            {comment.User.firstName} {comment.User.lastName}
          </div>
          <div className="text-xs">{date}</div>
          <div className='my-3'>{comment.content}</div>
          {comment.imageUrl && (
            <div className="w-full">
              <img
                src={comment.imageUrl}
                alt=""
                className="rounded-[5%] w-[30%] my-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
