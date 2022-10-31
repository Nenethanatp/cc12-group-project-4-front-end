import { useRef, useState } from 'react';
import * as userService from '../api/userApi';
import { toast } from 'react-toastify';
import profileImage from '../assets/images/profile-image.png';
import * as authService from '../api/authApi';
import { getMe } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditProfile({ description, closeModal, fetchUser }) {
  const [isDescription, setIsDescription] = useState(description);
  const [isImageUrl, setIsImageUrl] = useState(null);
  const [isOldPassword, setIsOldPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState('');
  const [isConfirmNewPassword, setIsConfirmNewPassword] = useState('');

  const user = useSelector((state) => state.auth.user);
  const ggSignin = useSelector((state) => state.auth.ggSignin);

  const dispatch = useDispatch();

  const updateGetMe = async () => {
    const res = await authService.getMe();
    dispatch(getMe(res.data));
  };

  // console.log(isDescription);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (isDescription === description) {
        formData.append('description', isDescription);
      }
      console.log(formData);

      if (isImageUrl) {
        formData.append('imageUrl', isImageUrl);
        console.log(formData);
      }

      if (isNewPassword || isOldPassword || isConfirmNewPassword) {
        if (!isOldPassword) {
          return toast.error('Old password is required');
        }
        if (!isNewPassword) {
          return toast.error('New password is required');
        }
        if (!isConfirmNewPassword) {
          return toast.error('Confirm new password is required');
        }
        if (isNewPassword !== isConfirmNewPassword) {
          return toast.error('New password not match with confirm password');
        }
        if (isNewPassword === isOldPassword) {
          return toast.error('New password is similar to old password');
        }
        if (isNewPassword === isConfirmNewPassword) {
          formData.append('newPassword', isNewPassword);
          formData.append('oldPassword', isOldPassword);
        }
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      if (
        !isNewPassword &&
        !isOldPassword &&
        !isConfirmNewPassword &&
        !!isImageUrl
      ) {
        toast.error('Nothing to update!!!!');
      } else {
        await userService.updateUserApi(formData);
        await fetchUser();
        await updateGetMe();
        setIsImageUrl(null);
        setIsOldPassword('');
        setIsNewPassword('');
        setIsConfirmNewPassword('');
        toast.success('Success update');
        closeModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data.message);

      console.log(err);
    }
  };

  const clear = () => {
    setIsImageUrl(null);
    inputEl.current.value = null;
  };

  const inputEl = useRef();
  return (
    <div className="flex justify-center  h-full w-full">
      <div className=" flex flex-col absolute w-80 bg-white  rounded-3xl z-30 p-10  items-center gap-2">
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
            src={
              !isImageUrl
                ? user.imageUrl
                  ? user.imageUrl
                  : profileImage
                : URL.createObjectURL(isImageUrl)
            }
            alt=""
            className="w-[100px] h-[100px] rounded-full mb-3 object-cover"
            onClick={() => {
              inputEl.current.click();
            }}
          />

          <div>
            <button
              className="bg-yellow-400 rounded-lg  p-2 w-full px-4"
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
        <div>
          <div>About you:</div>
          <textarea
            className="w-60  bg-gray-300 text-black max-h-20 min-h-[5rem]  p-2 text-xs rounded-md"
            placeholder="type here"
            value={isDescription || description || ''}
            onChange={(e) => setIsDescription(e.target.value)}
          />
        </div>

        {ggSignin ? (
          ''
        ) : (
          <div>
            <div className="w-60 ">
              <div>Old password:</div>
              <input
                type="password"
                className="bg-gray-300 w-60 rounded-md"
                onChange={(e) => setIsOldPassword(e.target.value)}
              />
            </div>
            <div className="w-60 ">
              <div>New password:</div>
              <input
                type="password"
                className="bg-gray-300 w-60 rounded-md"
                onChange={(e) => setIsNewPassword(e.target.value)}
              />
            </div>
            <div className="w-60 ">
              <div>Confirm new password:</div>
              <input
                type="password"
                className="bg-gray-300 w-60 rounded-md"
                onChange={(e) => setIsConfirmNewPassword(e.target.value)}
              />
            </div>{' '}
          </div>
        )}

        <button
          className="bg-yellow-400 rounded-lg mt-4 p-2 w-[140px]"
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
