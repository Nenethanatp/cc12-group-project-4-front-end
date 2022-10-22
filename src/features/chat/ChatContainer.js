import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import ChatSearchBar from './ChatSearchBar';
import * as roomService from '../../api/roomApi';
import socket from '../../config/socket';

function ChatContainer({ open, close }) {
  const [searchUsers, setSearchUsers] = useState([]);
  const [openChatBox, setOpenChatBox] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleClose = () => {
    setSearchUsers([]);
    close();
  };

  const selectChatUser = (input) => {
    setChatUser(input);
  };

  const fetchRoom = async (id) => {
    const res = await roomService.getRoom(user.id, id);
    if (res.data.result?.room) {
      setRoom(res.data.result.room);
      socket.emit('join_room', res.data.result.room);
      return;
    }
    const random =
      new Date().getTime() + '' + Math.round(Math.random() * 10000);
    const result = await roomService.createRoom(random, user.id, id);
    setRoom(result.data.result.room);
    socket.emit('join_room', result.data.result.room);
  };

  const handleMessage = (input) => {
    setMessage(input);
  };

  const createMessage = async () => {
    await roomService.createMessage(room, user.id, message);
  };

  const handleSendMessage = async () => {
    if (message !== '') {
      socket.emit('send_message', { message, room });
      await createMessage();
      setMessage('');
    }
  };

  const handleMessageReceived = (input) => {
    setMessageReceived(input);
  };

  const handleMessages = (input) => {
    setMessages(input);
  };

  return (
    <>
      {open && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-end justify-center z-10'
          onClick={handleClose}
        >
          <div
            className={`bg-white w-full ${
              openChatBox ? 'h-[95vh]' : 'h-[80vh]'
            } transition-all rounded-tl-3xl rounded-tr-3xl pt-10 fadein`}
            onClick={(e) => e.stopPropagation()}
          >
            {openChatBox ? (
              <div className='flex justify-center items-start h-full w-full'>
                <ChatBox
                  close={() => {
                    setOpenChatBox(false);
                    setChatUser({});
                    setRoom('');
                  }}
                  chatUser={chatUser}
                  handleMessage={handleMessage}
                  message={message}
                  handleSendMessage={handleSendMessage}
                  messageReceived={messageReceived}
                  room={room}
                  handleMessageReceived={handleMessageReceived}
                  handleMessages={handleMessages}
                  messages={messages}
                />
              </div>
            ) : (
              <div>
                <ChatSearchBar searchUsers={(input) => setSearchUsers(input)} />
                <ChatList
                  searchUsers={searchUsers}
                  openChatBox={() => setOpenChatBox(true)}
                  fetchRoom={fetchRoom}
                  selectChatUser={selectChatUser}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
