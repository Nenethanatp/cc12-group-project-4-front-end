import { useState } from 'react';
import Comment from './Comment';

function Post() {
  const image = [1];

  const [openDetail, setOpenDetail] = useState(true);

  console.log(openDetail);
  return (
    <>
      {!openDetail ? (
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
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5">
                <div className="flex items-center gap-1 text-sm">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <div>24</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <i className="fa-regular fa-message "></i>
                  <div>15</div>
                </div>
              </div>
              <div className="text-sm">18:00 18/10/2565</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          {image && (
            <div className="w-full relative">
              <i
                className="fa-solid fa-circle-chevron-left opacity-90 w-full h-full text-3xl absolute top-3 left-3"
                onClick={() => setOpenDetail((prev) => !prev)}
              ></i>

              <img
                src="https://ichef.bbci.co.uk/news/640/cpsprodpb/ea7e/live/dbb53ac0-491d-11ed-97ba-2d7f4db4e2b6.jpg"
                alt=""
                className="rounded-t-3xl w-full object-cover"
              ></img>
            </div>
          )}
          <div
            className={`bg-white flex flex-col p-5 gap-2 ${
              image ? 'rounded-b-3xl' : 'rounded-3xl'
            }`}
          >
            <div className="flex gap-3 ">
              <div className="">
                <img
                  src="https://www.cheatsheet.com/wp-content/uploads/2022/01/Demon-Slayer-Rengoku-1.jpg"
                  alt=""
                  className="rounded-full w-[40px] h-[40px]  object-cover"
                ></img>
              </div>
              <div className="flex flex-col">
                <div className="text-md">Fname Lname</div>
                <div className="text-xs">18:00 18/10/2565</div>
              </div>
            </div>

            <div className="text-lg font-semibold">น้ำท่วมสุขุมวิท</div>

            <div className="flex justify-between">
              <div className="flex gap-5">
                <div className="flex items-center gap-1 text-sm">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <div>24</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-message "></i>
                  <div>15</div>
                </div>
              </div>
            </div>
            <Comment />
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
