import { useState } from 'react';

function PostForm({ handleCreatePost }) {
  const [input, setInput] = useState({});

  return <form onSubmit={handleCreatePost} className="absolute inset-x-0 bottom-0 h-screen fadein">
      <div className="flex flex-col items-center h-screen w-[100%] bg-slate-100">

        <div className="items-center w-[100%]">
          <div className="mx-7 my-2 h-12 w-12">
            <button className="bg-white rounded-full p-2 material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%]">
          <textarea
            className="bg-white-000 w-[85%] rounded-2xl p-4"
            placeholder="what were you thinking?"
            rows='5'
            value={input.title}
          >
          </textarea>


          <div className="w-[85%] pt-5">
            <select id="categoryId" name="categoryId" value={input.categoryId}
              className="bg-white-000 w-[100%] rounded-2xl p-4">
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

          <div className="mt-5 w-[85%]">
            <img
              src={"https://via.placeholder.com/350x150"}
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
        <div className="h-[140px] flex items-center">
          <button className="bg-yellow-400 w-[320px] h-12 rounded-full font-bold text-lg">
            POST
          </button>
        </div>
      </div>
    </form>;
}

export default PostForm;
