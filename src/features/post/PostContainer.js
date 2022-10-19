import { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

function PostContainer() {
  return (
    <>
      <div className=" mt-52 bg-slate-200 h-full rounded-t-3xl flex justify-center p-6">
        <div className="w-full flex flex-col items-center gap-6">
          <button className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-[100%]">
            CREATE POST
          </button>
          <PostList />
          <PostForm />
        </div>
      </div>
    </>
  );
}

export default PostContainer;
