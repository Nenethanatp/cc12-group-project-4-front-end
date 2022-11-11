import { useSelector } from 'react-redux';

function ProfileNav({ handleClickFollow, openPost }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user.role === 'admin' ? (
        ''
      ) : (
        <div className='flex gap-8 bg-cyan-600 justify-around py-3 text-white font-bold'>
          <button onClick={() => openPost()}>Post</button>
          <button onClick={() => handleClickFollow()}>FollowList</button>
        </div>
      )}
    </>
  );
}

export default ProfileNav;
