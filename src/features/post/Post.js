import { useState } from 'react';
import PostDetail from './PostDetail';

function Post() {
  const image = [6];

  const [openDetail, setOpenDetail] = useState(true);
  const [liked, setLiked] = useState(true);

  const handleLike = (e) => {
    e.stopPropagation();
    // add like sent to backend
    setLiked((prev) => !prev);
  };

  const handleOption = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {openDetail ? (
        <PostDetail
          image={image}
          setOpenDetail={setOpenDetail}
          liked={liked}
          handleLike={handleLike}
        />
      ) : (
        <div
          className="flex flex-col "
          onClick={() => setOpenDetail((prev) => !prev)}
        >
          {image.length !== 0 && (
            <div className="w-full ">
              <img
                src="https://ichef.bbci.co.uk/news/640/cpsprodpb/ea7e/live/dbb53ac0-491d-11ed-97ba-2d7f4db4e2b6.jpg"
                alt=""
                className="rounded-t-3xl w-full object-cover"
              ></img>
            </div>
          )}
          <div
            className={`bg-white flex flex-col p-5 gap-2 ${
              image.length !== 0 ? 'rounded-b-3xl' : 'rounded-3xl'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">น้ำท่วมสุขุมวิท</div>
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
                      liked ? ' text-blue-600' : ''
                    }`}
                    onClick={handleLike}
                  />
                  <div>24</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <i className="fa-regular fa-message " />
                  <div>15</div>
                </div>
              </div>
              <div className="text-sm">18:00 18/10/2565</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
