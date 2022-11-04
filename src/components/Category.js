import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from '../store/typeSlice';
import { getPosts, getPostsByTypeId } from '../store/postSlice';

function Category({ setOpenFavorite, setOpenSubscribe }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const types = useSelector((state) => state.types.value);

  const selectedType = useSelector((state) => state.types.selectedType);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  let typeWithAll = [];
  if (types) {
    typeWithAll = [{ type: 'all', id: 0 }, ...types];
  }

  const handleSelectedType = (id) => {
    dispatch(setSelectedType(id));
    if (id === 0) {
      dispatch(getPosts());
    } else {
      dispatch(getPostsByTypeId(id));
    }
  };

  const handleClickFavorite = () => {
    status === 'subscribed' ? setOpenFavorite() : setOpenSubscribe();
  };

  return (
    <div
      className={`flex gap-3 justify-evenly items-center bg-cyan-700 w-full h-12`}
    >
      {typeWithAll?.map((type) => (
        <div
          className={`px-2 py-1 text-center rounded-2xl font-bold ${
            selectedType === type.id ? 'text-yellow-400' : 'text-white'
          } `}
          key={type.id}
          value={type.id}
          onClick={() => handleSelectedType(type.id)}
        >
          {type.type}
        </div>
      ))}
      <button
        className=" text-white"
        type="button"
      >
        following
      </button>
      <button
        className="material-symbols-outlined text-white"
        type="button"
        onClick={handleClickFavorite}
      >
        star
      </button>
    </div>
  );
}

export default Category;
