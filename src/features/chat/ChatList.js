import { useEffect } from 'react';
import ChatUser from './ChatUser';

function ChatList({ searchUsers, openChatBox, selectChatUser, fetchRoom }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <div className=' w-full max-h-[70vh] flex justify-center px-5 py-5 gap-5 flex-wrap overflow-auto'>
      {searchUsers?.map((item) => (
        <ChatUser
          key={item.id}
          item={item}
          src={item.imageUrl}
          firstName={item.firstName}
          lastName={item.lastName}
          openChatBox={openChatBox}
          selectChatUser={selectChatUser}
          fetchRoom={fetchRoom}
        />
      ))}
    </div>
  );
}

export default ChatList;
