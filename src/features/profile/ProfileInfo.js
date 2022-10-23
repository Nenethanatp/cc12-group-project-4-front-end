import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as getUserService from '../../api/authApi';
import profileImage from '../../assets/images/profile-image.png';

function ProfileInfo() {
  const [otherUser, setOtherUser] = useState(null);
  const { userId } = useParams();
  const me = useSelector((state) => state.auth.user);

  const isMe = me.id === otherUser?.id;

  console.log(isMe, 'isMe');
  console.log(me, 'me');
  console.log(otherUser, 'otherUser');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserService.getUserById(userId);
        setOtherUser(res.data.user);
        if (me === otherUser) {
          return setOtherUser(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userId]);

  // const isMe = me.id === id;
  // console.log(id);
  // console.log(isMe);
  // console.log(me.imageUrl === null);
  return (
    <div className="flex flex-col-reverse bg-black bg-opacity-40    top-0 right-0 bottom-0 left-0 ">
      <div className="flex text-black h-[90%] w-[100%]  pt-7 px-7   bg-white rounded-t-3xl ">
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
                    className="rounded-full object-fill w-[100px] h-[100px]"
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
          <div className=" flex flex-col h-[100%] w-[65%]">
            <div className="   h-[130px]">
              <div className="text-xl">
                {otherUser ? (
                  <>{`${otherUser.firstName} ${otherUser.lastName}`}</>
                ) : (
                  <>{`${me.firstName} ${me.lastName}`}</>
                )}
              </div>
              <div>
                {' '}
                {otherUser ? (
                  <>{`${otherUser.email}`}</>
                ) : (
                  <>{`${me.email}`}</>
                )}{' '}
              </div>
            </div>
            <div className="flex justify-center gap-5 text-xs">
              {!isMe ? (
                <>
                  <button className="bg-yellow-400 w-40 h-6 rounded-full">
                    FOLLOW
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-yellow-400 w-40 h-6 rounded-full">
                    EDIT PROFILE
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
