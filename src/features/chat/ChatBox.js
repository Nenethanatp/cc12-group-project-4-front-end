import { useEffect, useState } from 'react';
import socket from '../../config/socket';
import { v4 as uuidv4 } from 'uuid';
import * as roomService from '../../api/roomApi';
import { useSelector } from 'react-redux';
import ChatSender from './ChatSender';
import ChatReceiver from './ChatReceiver';
import BackIcon from '../../components/icons/BackIcon';

function ChatBox({
  close,
  room,
  chatUser,
  message,
  handleMessage,
  handleSendMessage,
  messageReceived,
  handleMessageReceived,
  handleMessages,
  messages,
  openChatBox
}) {
  const { firstName, lastName, imageUrl, id } = chatUser;
  const [isSent, setIsSent] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    socket.on('received_message', (data) => {
      handleMessageReceived(data.message);
    });

    socket.connect();
    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await roomService.getAllMessages(room);
        handleMessages(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    if (room !== '') {
      fetchMessages();
    }
    if (openChatBox) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      handleMessages([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, openChatBox]);

  useEffect(() => {
    handleMessages([
      ...messages,
      { id: uuidv4(), message: messageReceived, user: isSent ? user.id : id }
    ]);
    setIsSent(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageReceived]);

  return (
    <>
      <div className='w-[100%] h-[100%] flex flex-col items-center gap-5 mt-6'>
        <div className='w-full flex justify-center relative'>
          <div className='text-2xl text-cyan-600'>
            {firstName} {lastName}
          </div>
          <div
            onClick={close}
            className='absolute -top-[53px] left-3 customBgMorph rounded-full h-12 w-12 flex justify-center items-center bg-red-500 text-white'
          >
            <BackIcon />
          </div>
        </div>
        <div
          className={`w-[80%] h-[70%] bg-gray-200 p-2 rounded-2xl flex flex-col gap-2 overflow-y-scroll chatListMorph`}
        >
          {messages?.map((item) => {
            if (+item.user === user.id) {
              return <ChatSender key={item.id} message={item.message} />;
            } else {
              return (
                <ChatReceiver
                  key={item.id}
                  src={imageUrl}
                  size='40'
                  message={item.message}
                />
              );
            }
          })}
        </div>
        <form
          className='w-full flex justify-center'
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
            setIsSent(true);
          }}
        >
          <div className='h-[5vh] w-[80%] flex justify-center items-center gap-2'>
            <input
              className='h-10 w-[80%] rounded-full scroll-px-3 bg-gray-200 outline-green-400 px-5 chatListMorph'
              value={message}
              onChange={(e) => handleMessage(e.target.value)}
              placeholder='Reply'
            />
            <button className='h-[40px] w-[20%] rounded-full customBgMorph bg-yellow-500 text-white font-bold'>
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatBox;
