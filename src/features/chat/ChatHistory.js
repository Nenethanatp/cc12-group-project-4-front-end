import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as authService from '../../api/authApi';
import * as roomService from '../../api/roomApi';
import ChatHistoryList from './ChatHistoryList';
import MessageIcon from '../../components/icons/MessageIcon';

function ChatHistory({
  showChatHistory,
  openSearch,
  handleChatUser,
  handleOpenChatBox,
  fetchRoom
}) {
  const user = useSelector((state) => state.auth.user);
  const [rooms, setRooms] = useState([]);
  const [chatUserIds, setChatUserIds] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  const fetchAllChatRooms = async () => {
    try {
      const res = await roomService.getAllChatRooms();
      setRooms(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserById = async (id) => {
    const res = await authService.getUserById(id);
    return res.data.user;
  };

  useEffect(() => {
    fetchAllChatRooms();

    if (showChatHistory) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [showChatHistory]);

  useEffect(() => {
    if (rooms.length !== 0) {
      const arr = rooms.map((item) => {
        if (item.user1 !== user.id + '') {
          return item.user1;
        } else {
          return item.user2;
        }
      });
      setChatUserIds(arr);
    }
  }, [rooms]);

  useEffect(() => {
    const a = async () => {
      if (chatUserIds.length !== 0) {
        const arr = [];
        // chatUserIds.forEach(async (item) => {
        //   const eachUser = await getUserById(item);
        //   arr.push(eachUser);
        // });
        for (let obj of chatUserIds) {
          const eachUser = await getUserById(obj);
          arr.push(eachUser);
        }
        setChatUsers(arr);
      }
    };
    a();
  }, [chatUserIds]);

  return (
    <div>
      <div className='flex justify-center pb-5 mx-5 border-b-2 border-gray-200'>
        <div
          className='p-2 rounded-xl text-slate-500 textButton bg-slate-200 w-14 h-14 flex justify-center items-center'
          onClick={openSearch}
        >
          <MessageIcon />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {chatUsers?.map((item) => {
          return (
            <ChatHistoryList
              key={item.id}
              user={item}
              handleChatUser={handleChatUser}
              handleOpenChatBox={handleOpenChatBox}
              fetchRoom={fetchRoom}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatHistory;
