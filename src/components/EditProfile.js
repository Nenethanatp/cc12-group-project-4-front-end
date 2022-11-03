import { useRef, useState } from 'react';
import * as userService from '../api/userApi';
import { toast } from 'react-toastify';
import profileImage from '../assets/images/profile-image.png';
import * as authService from '../api/authApi';
import { getMe } from '../store/authSlice';
import { useDispatch } from 'react-redux';

function EditProfile({ description, closeModal, fetchUser }) {
  const [isDescription, setDescription] = useState(description);
  const [isImageUrl, setIsImageUrl] = useState(null);
  const [isOldPassword, setIsOldPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState('');

  const dispatch = useDispatch();

  const updateGetMe = async () => {
    const res = await authService.getMe();
    dispatch(getMe(res.data));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (isDescription) {
        formData.append('description', isDescription);
      }

      if (isImageUrl) {
        formData.append('imageUrl', isImageUrl);
      }

      if (isNewPassword || isOldPassword) {
        if (!isOldPassword) {
          return toast.error('old password is required');
        }
        if (!isNewPassword) {
          return toast.error('new password is required');
        }
        if (isNewPassword !== isOldPassword) {
          return toast.error('new password or old password is invalid');
        }
        if (isNewPassword === isOldPassword) {
          formData.append('newPassword', isNewPassword);
          formData.append('oldPassword', isOldPassword);
        }
      }

      await userService.updateUserApi(formData);

      await fetchUser();
      await updateGetMe();
      setIsImageUrl(null);
      setIsOldPassword('');
      setIsNewPassword('');
      closeModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const clear = () => {
    setIsImageUrl(null);
    inputEl.current.value = null;
  };

  //   const whatEditProfile = {};
  const inputEl = useRef();
  return (
    // <form>
    <div className='flex justify-center h-full'>
      <div className=' flex flex-col w-80 p-10 bg-slate-200 rounded-xl z-30 items-center'>
        <div className='flex flex-col items-center '>
          {isImageUrl && (
            <button
              className='material-symbols-outlined flex absolute right-20'
              onClick={() => clear()}
            >
              close
            </button>
          )}
          <img
            src={isImageUrl ? URL.createObjectURL(isImageUrl) : profileImage}
            alt=''
            className='w-[100px] h-[100px] rounded-full mb-3 object-cover customBgMorph'
            onClick={() => {
              inputEl.current.click();
            }}
          />

          <div>
            <button
              className='mt-2 customBgMorph py-1 px-2 rounded-xl bg-slate-200 text-cyan-600'
              onClick={() => {
                inputEl.current.click();
              }}
            >
              Edit profile image
            </button>
            <input
              type='file'
              ref={inputEl}
              className='hidden'
              onChange={(e) => {
                if (e.target.files[0]) {
                  setIsImageUrl(e.target.files[0]);
                }
              }}
            ></input>
          </div>
        </div>
        <div className='mt-3 flex flex-col items-center gap-3'>
          <div className='text-cyan-700 font-bold'>About you :</div>
          <textarea
            className='w-60 h-20 bg-gray-300 text-black max-h-20 min-h-[5rem] mb-2 px-3 py-1 customBgMorph'
            placeholder='Tell us about yourself'
            value={isDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='w-60 mt-2 mb-2 flex flex-col items-center gap-3'>
          <div className='font-bold text-cyan-700'>Old password :</div>
          <input
            type='password'
            className='bg-gray-300 w-60 h-10 customBgMorph'
          />
        </div>
        <div className='mt-2 mb-2 flex flex-col items-center gap-3'>
          <div className='text-cyan-700 font-bold'>New password :</div>
          <input
            type='password'
            className='bg-gray-300 w-60 h-10 customBgMorph'
          />
        </div>
        <button
          className='text-lg bg-green-500 text-white font-bold mt-5 customBgMorph py-1 px-2 rounded-xl'
          onClick={handleSubmitForm}
        >
          Confirm
        </button>
      </div>
    </div>
    // </form>
  );
}

export default EditProfile;
