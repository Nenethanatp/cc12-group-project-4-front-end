import { useSelector } from 'react-redux';
import { useState } from 'react';

function ProfileNav({ handleClickFollow, openPost }) {
  const user = useSelector((state) => state.auth.user);
  const [select, setSelect] = useState('post');
  return (
    <>
      {user.role === 'admin' ? (
        ''
      ) : (
        <div className='flex gap-8 bg-cyan-600 justify-around py-3 font-bold'>
          <button
            className={`${
              select === 'post' ? 'text-yellow-400' : 'text-white'
            }`}
            onClick={() => {
              openPost();
              setSelect('post');
            }}
          >
            Post
          </button>
          <button
            className={`${
              select === 'followList' ? 'text-yellow-400' : 'text-white'
            }`}
            onClick={() => {
              setSelect('followList');
              handleClickFollow();
            }}
          >
            FollowList
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileNav;
