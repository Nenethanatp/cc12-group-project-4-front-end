import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from '../store/typeSlice';
import {
  getPosts,
  getPostsByFollowing,
  getPostsByTypeId
} from '../store/postSlice';

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
    typeWithAll = [
      { type: 'all', id: 'all' },
      ...types,
      { type: 'following', id: 'follow' }
    ];
  }

  const handleSelectedType = (id) => {
    dispatch(setSelectedType(id));
    if (id === 'all') {
      dispatch(getPosts());
    } else if (id === 'follow') {
      dispatch(getPostsByFollowing());
    } else {
      dispatch(getPostsByTypeId(id));
    }
  };

  const handleClickFavorite = () => {
    status === 'subscribed' ? setOpenFavorite() : setOpenSubscribe();
  };

  return (
    <div
      className={`p-5 flex gap-9 items-center bg-cyan-700 h-[6vh] overflow-auto overflow-y-hidden`}
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
        type='button'
        onClick={handleClickFavorite}
      >
        star
      </button>
    </div>
  );
}

export default Category;
