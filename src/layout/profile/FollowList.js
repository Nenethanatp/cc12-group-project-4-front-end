import Following from './Following';

function FollowList({ allFollower, handleClickFollow }) {
  return (
    <>
      <div onClick={() => handleClickFollow()}>
        <div className="flex flex-col gap-10  ml-5">
          {allFollower.follow?.map((el) => (
            <Following key={el.id} el={el} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FollowList;
