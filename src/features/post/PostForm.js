import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostFormImage from './PostFormImage';
import AddPhotoButton from './AddPhotoButton';

function PostForm({ handleCreatePost, toggleCreatePost }) {
  const fileEl = useRef();

  const user = useSelector((state) => state.auth.user);
  const [input, setInput] = useState({
    content: '',
    typeId: 1,
    userId: user.id,
    latitude: 111,
    longitude: 222,
    postImages: []
  });

  const handleSetPostImage = (value) => {
    setInput({ ...input, postImages: [...input.postImages, value] });
  };

  const onCreatePost = async (e) => {
    e.preventDefault();
    console.log(input);
    await handleCreatePost(input);
  };

  return (
    <form
      onSubmit={onCreatePost}
      className='absolute top-0 h-[100%] w-[100%] mt-6'
    >
      <div className='flex flex-col items-center h-full w-[100%] bg-slate-200'>
        <div className='items-center w-[90%]'>
          <div className='h-12 w-12'>
            <button
              className='bg-white rounded-full p-2 material-symbols-outlined'
              type={'button'}
              onClick={toggleCreatePost}
            >
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center w-[100%] mt-5'>
          <textarea
            className='bg-white-000 w-[90%] rounded-2xl p-4'
            placeholder='what were you thinking?'
            rows='5'
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
          ></textarea>

          <div className='w-[90%] pt-5'>
            <select
              id='categoryId'
              name='categoryId'
              value={input.typeId}
              className='bg-white-000 w-[100%] rounded-2xl p-4'
              onChange={(e) =>
                setInput({ ...input, typeId: parseInt(e.target.value) })
              }
            >
              <option value='1'>Cat#1</option>
              <option value='2'>Cat#2</option>
              <option value='3'>Cat#3</option>
              <option value='4'>Cat#4</option>
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

          {/*<div className="mt-5 w-[90%]">*/}
          {/*  <img*/}
          {/*    src={'https://via.placeholder.com/350x150'}*/}
          {/*    alt="Upload_Photo"*/}
          {/*    className="img-fluid rounded-2xl"*/}
          {/*    width="100%"*/}
          {/*  ></img>*/}
          {/*</div>*/}
          <div
            className='flex flex-col items-center w-[100%] mt-5'
            style={{ maxWidth: '300px' }}
          >
            <label htmlFor='postImage' className='form-label'>
              อัพโหลดรูปภาพ
            </label>
            <div>
              {input.postImages.length !== 0 ? (
                <>
                  {input.postImages.map((postImage, index) => {
                    return (
                      <PostFormImage
                        key={index}
                        postImage={postImage}
                        index={index}
                        input={input}
                        setInput={setInput}
                      />
                    );
                  })}
                </>
              ) : (
                <AddPhotoButton />
              )}
            </div>
            <input
              type='file'
              className='d-none'
              ref={fileEl}
              onChange={(e) => {
                // console.log(e.target.value);
                // if (req.files?.postImage) {
                //   for (let el of req.files.postImage) {

                if (e.target.files[0]) {
                  handleSetPostImage(e.target.files[0]);
                }
              }}
            />
          </div>
          {/* <input
          className='bg-gray-200 h-11 w-[320px] px-5'
          placeholder='upload photo'

        /> */}
        </div>
        <button className='bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-[90%] mt-5'>
          POST
        </button>
      </div>
    </form>
  );
}

export default PostForm;
