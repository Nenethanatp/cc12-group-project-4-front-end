import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from '../store/typeSlice';
import { getPosts, getPostsByTypeId } from '../store/postSlice';

function Category({ setOpenFavorite }) {
  const dispatch = useDispatch();

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

  return (
    <div
      // className={`grid grid-cols-${types?.length} gap-1 mx-auto text-center `}
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
        className='material-symbols-outlined text-white'
        onClick={setOpenFavorite}
      >
        star
      </button>
    </div>
  );
}

export default Category;
