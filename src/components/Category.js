import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from '../store/typeSlice';
import { getPosts, getPostsByTypeId } from '../store/postSlice';

function Category() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types.value);

  const selectedType = useSelector((state) => state.types.selectedType);
  console.log(selectedType);
  useEffect(() => {
    dispatch(getTypes());
  }, []);

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
    <div className="w-11/12 mx-auto">
      <div
        // className={`grid grid-cols-${types?.length} gap-1 mx-auto text-center `}
        className={`flex gap-3 mx-auto text-center items-center`}
      >
        {typeWithAll?.map((type) => (
          <div
            className={` p-1 text-center rounded-2xl  w-[400px] ${
              selectedType === type.id ? 'bg-amber-400' : 'bg-slate-200'
            } `}
            key={type.id}
            value={type.id}
            onClick={() => handleSelectedType(type.id)}
          >
            {type.type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
