import Following from './Following';

function FollowList({ allFollower, handleClickFollow }) {
  return (
    <>
      <div onClick={() => handleClickFollow()}>
        <div className='flex flex-col gap-3  px-5  py-3 bg-gray-200'>
          {allFollower.follow?.map((el) => (
            <Following key={el.id} el={el} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FollowList;
