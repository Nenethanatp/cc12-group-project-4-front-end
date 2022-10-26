import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as commentService from '../../api/commentApi';
import { getPosts } from '../../store/postSlice';

function CommentForm({ id }) {
  const [comment, setComment] = useState('');
  const [commentImage, setCommentImage] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (!comment || !comment.trim()) {
        return toast.error('comment is required');
      }

      if (comment) {
        formData.append('content', comment);
      }
      if (commentImage) {
        formData.append('commentImage', commentImage);
      }

      await commentService.createCommentApi(id, formData);
      setComment('');
      setCommentImage(null);
      dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
  };

  const inputEl = useRef();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 ">
          <hr />
          {/* <div className="w-full flex flex-col rounded-lg bg-slate-200  gap-2 p-3 "> */}
          <div className="flex flex-col gap-3">
            {commentImage && (
              <div className=" relative w-full">
                <img
                  src={commentImage ? URL.createObjectURL(commentImage) : ''}
                  alt="comment img"
                  className="rounded-lg w-full"
                ></img>
                <div
                  className="bg-white absolute right-2 top-2 rounded-full w-[20px] h-[20px] flex justify-center items-center"
                  onClick={() => {
                    setCommentImage(null);
                  }}
                >
                  <i className="fa-solid fa-xmark "></i>
                </div>
              </div>
            )}
            <div className="w-full flex rounded-lg bg-slate-100 justify-between items-center gap-2 ">
              <input
                className="text-base py-3 pl-4 rounded-lg w-full bg-slate-100 "
                placeholder="comment . . ."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <span
                className="fa-solid fa-image text-slate-500 w-auto pr-3"
                onClick={() => {
                  inputEl.current.click();
                }}
              ></span>
            </div>
            <input
              type="file"
              ref={inputEl}
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setCommentImage(e.target.files[0]);
                }
              }}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
