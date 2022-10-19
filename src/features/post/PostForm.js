import { useState } from 'react';

function PostForm({ handleCreatePost }) {
  const [input, setInput] = useState({});

  return (
    <form onSubmit={handleCreatePost} className="absolute top-0 h-[100%] mt-6">
      <div className="flex flex-col items-center h-full w-[100%] bg-slate-200">
        <div className="items-center w-[100%]">
          <div className="h-12 w-12">
            <button className="bg-white rounded-full p-2 material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%] mt-5">
          <textarea
            className="bg-white-000 w-[100%] rounded-2xl p-4"
            placeholder="what were you thinking?"
            rows="5"
            value={input.title}
          ></textarea>

          <div className="w-[100%] pt-5">
            <select
              id="categoryId"
              name="categoryId"
              value={input.categoryId}
              className="bg-white-000 w-[100%] rounded-2xl p-4"
            >
              <option>Cat#1</option>
              <option>Cat#2</option>
              <option>Cat#3</option>
              <option>Cat#4</option>
            </select>
          </div>

          {/*
          <div className="w-[85%] h-[60px] items-center grid grid-cols-4 gap-2">
            <div>
              <button className="bg-gray-200 rounded-2xl text-sm p-2">
                Cat#1
              </button>
            </div>
            <div>
              <button className="bg-gray-200 rounded-2xl text-sm p-2">
                Cat#2
              </button>
            </div>
            <div>
              <button className="bg-gray-200 rounded-2xl text-sm p-2">
                Cat#3
              </button>
            </div>
            <div>
              <button className="bg-gray-200 rounded-2xl text-sm p-2">
                Cat#4
              </button>
            </div>
          </div>
          */}

          <div className="mt-5 w-[100%]">
            <img
              src={'https://via.placeholder.com/350x150'}
              alt="Upload_Photo"
              className="img-fluid rounded-2xl"
              width="100%"
            ></img>
          </div>
          {/* <input
          className='bg-gray-200 h-11 w-[320px] px-5'
          placeholder='upload photo'

        /> */}
        </div>
        <button className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-[100%] mt-5">
          POST
        </button>
      </div>
    </form>
  );
}

export default PostForm;
