import { useState } from 'react';
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
      dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
    setComment('');
    setCommentImage(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <hr />
          <input
            className="bg-slate-200 w-full text-base py-1 px-2 rounded-lg"
            placeholder="comment . . ."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
