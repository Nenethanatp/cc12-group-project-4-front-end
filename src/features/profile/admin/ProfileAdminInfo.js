import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as authService from '../../../api/authApi';
import * as userService from '../../../api/userApi';
import { getMe } from '../../../store/authSlice';
import profileImage from '../../../assets/images/profile-image.png';
import * as getUserService from '../../../api/authApi';
import { toast } from 'react-toastify';
import { useLoading } from '../../../context/LoadingContext';

function ProfileAdminInfo() {
  const [isAdmin, setIsAdmin] = useState();
  const { userId } = useParams();
  const admin = useSelector((state) => state.auth.user);
  const [isImageUrl, setIsImageUrl] = useState(null);
  const [isOldPassword, setIsOldPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { startLoading, stopLoading } = useLoading();

  const updateGetMe = async () => {
    const res = await authService.getMe();
    dispatch(getMe(res.data));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (isImageUrl) {
        formData.append('imageUrl', isImageUrl);
      }

      if (isNewPassword || isOldPassword || isConfirmPassword) {
        if (!isOldPassword) {
          return toast.error('Old password is required');
        }
        if (!isNewPassword) {
          return toast.error('New password is required');
        }
        if (isNewPassword !== isConfirmPassword) {
          return toast.error('New password not match with confirm password');
        }
        if (isNewPassword === isOldPassword) {
          return toast.error('New password is similar to old password');
        }
        if (isNewPassword !== isOldPassword) {
          formData.append('newPassword', isNewPassword);
          formData.append('oldPassword', isOldPassword);
        }
      }
      if (!isNewPassword && !isOldPassword && !isImageUrl) {
        toast.error('Nothing to update');
      } else {
        startLoading();
        const res = await userService.updateUserApi(formData);
        await fetchUser();
        await updateGetMe();
        setIsImageUrl(null);
        setIsOldPassword('');
        setIsNewPassword('');
        toast.success('Success update');
        stopLoading();
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

  const fetchUser = async () => {
    try {
      const res = await getUserService.getUserById(userId);
      setIsAdmin(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchUser();
  }, [userId]);
  return (
    <div className="flex flex-col-reverse bg-white top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col h-[88vh] items-center text-black pt-14 px-10 bg-cyan-500 rounded-t-3xl mt-5">
        <div>
          <div>
            <div className="flex flex-col items-center ">
              {isImageUrl && (
                <button
                  className="material-symbols-outlined absolute right-20"
                  onClick={() => clear()}
                >
                  close
                </button>
              )}
              <img
                src={
                  !isImageUrl
                    ? admin.imageUrl
                      ? admin.imageUrl
                      : profileImage
                    : URL.createObjectURL(isImageUrl)
                }
                alt=""
                className="w-[150px] h-[150px] rounded-full  object-cover mb-6 shadow-lg"
                onClick={() => {
                  inputEl.current.click();
                }}
              />
              <button
                className="adminButtonMorph px-3 py-1 rounded-lg text-cyan-900"
                onClick={() => {
                  inputEl.current.click();
                }}
              >
                Edit profile image
              </button>
              <div>
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
          </div>
        </div>

        <div className="flex  flex-col items-center text-cyan-900  w-full pt-8">
          <div className="text-3xl text-cyan-200 mb-2">
            <>{`${admin.firstName} ${admin.lastName}`}</>
          </div>
          <div className="italic">{<>{`${admin.email}`}</>}</div>
          <div className="flex flex-col gap-1 mb-3 pt-6">
            <div className="w-full">
              Old password:
              <input
                type="password"
                className="bg-gray-300  w-[100%] px-3 py-2 my-1 shadow-md rounded-lg"
                onChange={(e) => setIsOldPassword(e.target.value)}
              />
            </div>

            <div className="w-full">
              New password:
              <input
                type="password"
                className="bg-gray-300  w-[100%] px-3 py-2 my-1 shadow-md rounded-lg"
                onChange={(e) => setIsNewPassword(e.target.value)}
              />
            </div>

            <div className="w-full">
              Confirm new password:
              <input
                type="password"
                className="bg-gray-300  w-[100%] px-3 py-2 my-1 shadow-md rounded-lg"
                onChange={(e) => setIsConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center  gap-5 text-xs pt-4">
            <>
              <button
                className="bg-yellow-400 w-40 h-10 rounded-full text-[1.5rem] shadow-md mt-3"
                onClick={handleSubmitForm}
              >
                UPDATE
              </button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdminInfo;
