function ChatHistoryList({
  user,
  handleChatUser,
  handleOpenChatBox,
  fetchRoom
}) {
  return (
    <div className='flex justify-between items-center p-3 mx-5 border-b-2 border-gray-200'>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div
        className='bg-blue-500 p-2 text-white rounded-xl italic'
        onClick={() => {
          handleChatUser(user);
          handleOpenChatBox();
          fetchRoom(user.id);
        }}
      >
        message
      </div>
    </div>
  );
}

export default ChatHistoryList;
