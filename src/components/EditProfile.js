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
    <div className="flex justify-center  h-full">
      <div className=" flex flex-col absolute w-80 h-[30rem] bg-white  rounded-3xl z-30 p-3 pt-10  items-center">
        <div className="flex flex-col items-center ">
          {isImageUrl && (
            <button
              className="material-symbols-outlined flex absolute right-20"
              onClick={() => clear()}
            >
              close
            </button>
          )}
          <img
            src={isImageUrl ? URL.createObjectURL(isImageUrl) : profileImage}
            alt=""
            className="w-[100px] h-[100px] rounded-full mb-3 object-cover"
            onClick={() => {
              inputEl.current.click();
            }}
          />

          <div>
            <button
              className="bg-yellow-400 px-3 rounded-lg"
              onClick={() => {
                inputEl.current.click();
              }}
            >
              Edit profile image
            </button>
            <input
              type="file"
              ref={inputEl}
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setIsImageUrl(e.target.files[0]);
                }
              }}
            ></input>
          </div>
        </div>
        <div className="mt-3">
          <div>About you:</div>
          <textarea
            className="w-60 h-20 bg-gray-300 text-black max-h-20 min-h-[5rem] mb-2"
            placeholder="type here"
            value={isDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-60 mb-2">
          <div>Old password</div>
          <input type="password" className="bg-gray-300 w-60" />
        </div>
        <div className="w-60 mb-2">
          <div>New password</div>
          <input type="password" className="bg-gray-300 w-60" />
        </div>
        <button
          className="bg-yellow-400 rounded-lg w-20"
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
