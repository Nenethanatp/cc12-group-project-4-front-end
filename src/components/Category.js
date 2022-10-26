import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from '../store/typeSlice';

function Category() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types.value);
  console.log(types);

  const selectedType = useSelector((state) => state.types.selectedType);
  console.log(selectedType);
  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <div
        // className={`grid grid-cols-${types?.length} gap-1 mx-auto text-center `}
        className={`flex gap-3 mx-auto text-center `}
      >
        {types?.map((type) => (
          <div
            className="bg-slate-200 p-1 text-center rounded-lg hover:bg-yellow-300 w-[400px] "
            key={type.id}
            value={type.type}
            onClick={() => {
              dispatch(setSelectedType(type.type));
            }}
          >
            {type.type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
