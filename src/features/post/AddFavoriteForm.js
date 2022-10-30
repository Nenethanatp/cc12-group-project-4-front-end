import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoading } from '../../context/LoadingContext';
import { toast } from 'react-toastify';

function AddFavoriteForm({ handleAddFavorite, toggleAddFavorite }) {
  const location = useSelector((state) => state.map.location);

  const { startLoading, stopLoading } = useLoading();

  const [input, setInput] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });

  const onAddFavorite = async (e) => {
    try {
      e.preventDefault();

      if (!input.name) {
        return toast.error('name is required');
      }

      console.log(location);
      if (!location.lat || !location.lng) {
        return toast.error('location is required');
      }

      input.latitude = location.lat;
      input.longitude = location.lng;

      startLoading();
      await handleAddFavorite(input);

      input.name = '';
      input.latitude = location.lat;
      input.longitude = location.lng;
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={onAddFavorite} className="h-full w-full p-6 flex justify-center bg-white rounded-t-xl">
      <div className='flex flex-col items-center h-auto w-[100%]  '>
        <div className='items-center w-full'>
          <div className='h-12 w-12'>
            <button
              className='bg-gray-200 rounded-full p-2 material-symbols-outlined'
              type={'button'}
              onClick={toggleAddFavorite}
            >
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center w-[100%] mt-5'>
          <input
            className='bg-gray-200 w-full rounded-2xl p-4 shadow-lg'
            placeholder='Name your favorite place'
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </div>
        <div className='h-[240px] w-full flex items-center'>
          <div className='w-full flex flex-col gap-2'>
            <button className='bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-full shadow-lg'>
              ADD FAVORITE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddFavoriteForm;
