function Comment({ comment }) {
  return (
    <div className="flex flex-col gap-2">
      <hr />
      <div className="flex gap-3 ">
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
          <div className="text-xs">18:00 18/10/2565</div>
        </div>
      </div>
      <div>{comment.content}</div>
      <div>
        <img src={comment.imageUrl} alt="" className="rounded-[5%]" />
      </div>
    </div>
  );
}

export default Comment;
