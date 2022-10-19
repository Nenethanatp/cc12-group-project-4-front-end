import { useState } from 'react';

function CommentForm() {
  const [comment, setComment] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    // sent comment to backend
    setComment('');
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
