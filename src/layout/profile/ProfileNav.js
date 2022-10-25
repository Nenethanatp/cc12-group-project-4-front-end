function ProfileNav({ handleClickFollow, openPost }) {
  return (
    <>
      <div className="h-12 flex gap-10 bg-gray-200 py-3 pl-10 rounded-t-3xl">
        <button onClick={() => openPost()}>Post</button>
        <button onClick={() => handleClickFollow()}>FollowList</button>
      </div>
    </>
  );
}

export default ProfileNav;
