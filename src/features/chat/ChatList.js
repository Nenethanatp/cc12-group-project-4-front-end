import ChatUser from './ChatUser';

function ChatList({ searchUsers, openChatBox, selectChatUser, fetchRoom }) {
  return (
    <div className=' w-full max-h-[71vh] flex justify-center px-5 py-10 gap-5 flex-wrap'>
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
