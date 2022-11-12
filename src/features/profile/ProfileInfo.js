import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as getUserService from '../../api/authApi';
import * as followService from '../../api/followApi';
import profileImage from '../../assets/images/profile-image.png';
import EditProfile from '../../components/EditProfile';
import { dateObjToString } from '../../utils/formatDate';
import SettingIcon from '../../components/icons/SettingIcon';
import CenterModal from '../../components/CenterModal';
import { getEndDate } from '../../store/subscribeSlice';
import { useLoading } from '../../context/LoadingContext';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

function ProfileInfo() {
  const [otherUser, setOtherUser] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [follow, setFollow] = useState(null);
  const [isFollow, setIsFollow] = useState('');
  const [doUseEffect, setDoUseEffect] = useState(false);
  const { userId } = useParams();
  const me = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  const isMe = me.id === otherUser?.id;
  const subEndDate = useSelector((state) => state.subscribe.endDate);

  let endDateNewFormat;
  if (subEndDate !== 'expired' && subEndDate) {
    endDateNewFormat = dateObjToString(subEndDate);
  }

  const openEditProfile = () => {
    setIsEditProfile(true);
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    const fetchAll = async () => {
      await fetchUser();
      await fetchFollow();
      setLoading(false);
      // stopLoading();
    };
    // console.log(otherUser);

    fetchAll();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await getUserService.getUserById(userId);
      setOtherUser(res.data.user);
      if (me === res.data.user) {
        return setOtherUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollow = async () => {
    try {
      const res = await followService.getFollow();
      setIsFollow(res.data.follow);
    } catch (err) {
      console.log(err);
    }
  };

  const followUser = (isFollow || []).map((el) => el.followingId);
  const followed = followUser.includes(otherUser?.id);

  const handleFollow = async () => {
    try {
      const res = await followService.toggleFollow(userId);
      setFollow(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickFollow = async () => {
    await handleFollow();
    await fetchFollow();
  };
  const FOLLOW = 'FOLLOW';
  const FOLLOWING = 'FOLLOWING';

  return (
    <>
      {!loading ? (
        <div className="flex flex-col-reverse bg-slate-200q top-0 right-0 bottom-0 left-0">
          <div className="flex text-black h-[200px] w-[100%]  pt-7 px-7   bg-cyan-500 rounded-t-3xl mt-5">
            <div className="flex relative justify-end items-center w-full h-[50%] ">
              <div className="w-[20%] absolute top-0 left-0">
                <div className="mt-5 w-[100px] h-[100px] bg-slate-300 rounded-full flex justify-center items-center">
                  {otherUser ? (
                    <>
                      <img
                        src={`${
                          otherUser.imageUrl ? otherUser.imageUrl : profileImage
                        }`}
                        alt="profileImg"
                        className="rounded-full object-cover w-[100px] h-[100px]"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={`${me.imageUrl ? me.imageUrl : profileImage}`}
                        alt="profileImg"
                        className="rounded-full object-fill w-[100px] h-[100px]"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="mt-14 flex justify-center top-10 flex-col  h-[178px] w-[65%]">
                <div className="h-[100px] flex flex-col items-center justify-center gap-2">
                  <div className="text-xl text-white font-bold">
                    {otherUser ? (
                      <>{`${otherUser.firstName} ${otherUser.lastName}`}</>
                    ) : (
                      <>{`${me.firstName} ${me.lastName}`}</>
                    )}
                  </div>
                  <div className="text-white emailCyanMorph rounded-lg px-3 py-1">
                    {otherUser ? (
                      <>{`${otherUser.email}`}</>
                    ) : (
                      <>{`${me.email}`}</>
                    )}
                  </div>
                  <div className="text-xs">
                    {otherUser ? (
                      <>{`${
                        otherUser.description ? otherUser.description : ''
                      }`}</>
                    ) : (
                      <>{`${me.description ? me.description : ''}`}</>
                    )}
                  </div>
                </div>
                <div className="flex justify-center gap-5 text-xs bottom-0 left-7">
                  {!isMe ? (
                    <>
                      <button
                        className="bg-yellow-400 p-2 rounded-xl font-bold text-cyan-900"
                        onClick={handleClickFollow}
                      >
                        {followed ? FOLLOWING : FOLLOW}
                      </button>
                    </>
                  ) : (
                    <>
                      {subEndDate !== 'expired' && subEndDate ? (
                        <div className="border-white border-2 p-1 rounded-lg text-white absolute top-[130px] text-xs right-[5px] bg-cyan-600 ">
                          <p>Subscribe expire on {endDateNewFormat}</p>
                        </div>
                      ) : (
                        ''
                      )}
                      <button
                        className="text-yellow-300 p-3 mb-3 rounded-full"
                        onClick={openEditProfile}
                      >
                        <SettingIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Modal
            open={isEditProfile}
            content={
              <EditProfile
                imageUrl={me.profileImage}
                description={me.description}
                closeModal={setIsEditProfile}
                fetchUser={fetchUser}
              />
            }
            close={() => setIsEditProfile(false)}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ProfileInfo;
