import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as getUserService from '../../api/authApi';
import * as followService from '../../api/followApi';
import profileImage from '../../assets/images/profile-image.png';
import Modal from '../../components/Modal';
import EditProfile from '../../components/EditProfile';
import { dateObjToString } from '../../utils/formatDate';
import { getEndDate } from '../../store/subscribeSlice';

function ProfileInfo() {
  const [otherUser, setOtherUser] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [follow, setFollow] = useState(null);
  const [isFollow, setIsFollow] = useState('');
  const { userId } = useParams();
  const me = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getEndDate());
  // }, []);
  const isMe = me.id === otherUser?.id;
  const subEndDate = useSelector((state) => state.subscribe.endDate);

  let endDateNewFormat;
  if (subEndDate !== 'expired' && subEndDate) {
    endDateNewFormat = dateObjToString(subEndDate);
  }

  // console.log(me);
  const openEditProfile = () => {
    setIsEditProfile(true);
  };

  const fetchUser = async () => {
    try {
      const res = await getUserService.getUserById(userId);
      setOtherUser(res.data.user);
      if (me === otherUser) {
        // dispatch(getMe(res.data));
        return setOtherUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchUser();
    fetchFollow();
  }, [userId]);

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
    <div className="flex flex-col-reverse bg-red-500     top-0 right-0 bottom-0 left-0 h-96]">
      <div className="flex text-black h-[200px] w-[100%]  pt-7 px-7   bg-white rounded-t-3xl">
        <div className="flex relative justify-end items-center w-full h-[50%] ">
          <div className="w-[20%] absolute top-0 left-0">
            <div className="w-[100px] h-[100px] bg-slate-300 rounded-full flex justify-center items-center">
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
          <div className=" flex relative top-10 flex-col  h-[178px] w-[65%]">
            <div className="h-[170px] ">
              <div className="text-xl ">
                {otherUser ? (
                  <>{`${otherUser.firstName} ${otherUser.lastName}`}</>
                ) : (
                  <>{`${me.firstName} ${me.lastName}`}</>
                )}
              </div>
              <div>
                {otherUser ? <>{`${otherUser.email}`}</> : <>{`${me.email}`}</>}
              </div>
              <div className="text-xs">
                {otherUser ? (
                  <>{`${otherUser.description ? otherUser.description : ''}`}</>
                ) : (
                  <>{`${me.description ? me.description : ''}`}</>
                )}
              </div>
            </div>
            <div className="flex justify-center absolute gap-5 text-xs bottom-0 left-7">
              {!isMe ? (
                <>
                  <button
                    className="bg-yellow-400 w-40 h-6 rounded-full"
                    onClick={handleClickFollow}
                  >
                    {followed ? FOLLOWING : FOLLOW}
                  </button>
                </>
              ) : (
                <>
                  {subEndDate !== 'expired' && subEndDate ? (
                    <div className="border-red-300 border-2 p-1 rounded-lg text-red-300 absolute top-0 text-xs left-[-150px]">
                      <p>Subscribe expire on</p>
                      <p>{endDateNewFormat}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  <button
                    className="bg-yellow-400 w-40 h-6 rounded-full"
                    onClick={openEditProfile}
                  >
                    EDIT PROFILE
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
  );
}

export default ProfileInfo;
