import {formatDate} from '../../utils/formatDate';
import {useState} from "react";
import Modal from '../../components/Modal';
import ConfirmDelete from "./ConfirmDelete";
import {useDispatch} from "react-redux";
import {destroyFavorite} from "../../store/favoriteSlice";

function Favorite({favorite, handleSetMapCenter}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();

  function onSetMapCenter(e) {
    e.preventDefault();
    console.log(favorite)
    handleSetMapCenter(favorite);
  }

  const handleDeleteFavorite = async (favorite) => {
    try {
      dispatch(destroyFavorite(favorite.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="flex flex-col"
      >
        <div className={`bg-white flex flex-col p-5 gap-2 rounded-3xl mb-5`} style={{border: '1px solid red'}}>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold" onClick={onSetMapCenter}>
              <button className="material-symbols-outlined float-left" onClick={onSetMapCenter}>my_location</button>
              <div className="pl-2 float-left">{favorite.name}</div>
            </div>
            <div className="float-right">
              <button onClick={() => setOpenConfirm(true)}>
                <i className="fa-solid fa-trash-alt text-red-700"></i>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{formatDate(favorite.createdAt)}</div>
          </div>
        </div>
      </div>
      <Modal
        open={openConfirm}
        content={
          <ConfirmDelete
            favoriteName={favorite.name}
            cancel={() => {
              setOpenConfirm(false);
            }}
            confirm={() => {
              handleDeleteFavorite(favorite);
            }}
          />
        }
        close={() => setOpenConfirm(false)}
      />
    </>
  )
}

export default Favorite;