import {formatDate} from '../../utils/formatDate';

function Favorite({favorite, handleSetMapCenter}) {

  function onSetMapCenter(e) {
    e.preventDefault();
    console.log(favorite)
    handleSetMapCenter(favorite);
  }

  return (
    <div
      className="flex flex-col"
    >
      <div className={`bg-white flex flex-col p-5 gap-2 rounded-3xl mb-5`} style={{border: '1px solid red'}}>
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            {favorite.name}
          </div>
          <div className="float-right">
            <button className="material-symbols-outlined" onClick={onSetMapCenter}>my_location</button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm">{formatDate(favorite.createdAt)}</div>
        </div>
      </div>
    </div>
  )
}

export default Favorite;