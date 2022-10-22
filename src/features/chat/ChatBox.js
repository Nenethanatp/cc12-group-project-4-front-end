import { useEffect, useState } from 'react';
import socket from '../../config/socket';
import { v4 as uuidv4 } from 'uuid';
import * as roomService from '../../api/roomApi';
import { useSelector } from 'react-redux';
import ChatSender from './ChatSender';
import ChatReceiver from './ChatReceiver';

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
  messages
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

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
      <div className='w-[100%] h-[100%] flex flex-col items-center gap-5'>
        <div className='w-full flex justify-center relative'>
          <div className='text-2xl'>
            {firstName} {lastName}
          </div>
          <div
            onClick={close}
            className='absolute top-0 left-10 bg-red-300 rounded-full h-10 w-10 flex justify-center items-center'
          >
            X
          </div>
        </div>
        <div className='w-[80%] h-[70%] bg-gray-200 rounded-2xl flex flex-col gap-2 overflow-scroll'>
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
              className='h-10 w-[80%] rounded-full scroll-px-3 bg-gray-200 outline-green-400 px-5'
              value={message}
              onChange={(e) => handleMessage(e.target.value)}
            />
            <button className='bg-yellow-400 h-[40px] w-[20%] rounded-full'>
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatBox;
