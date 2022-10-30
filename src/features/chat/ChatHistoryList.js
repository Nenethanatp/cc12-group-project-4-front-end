import TextIcon from '../../components/icons/TextIcon';

function ChatHistoryList({
  user,
  handleChatUser,
  handleOpenChatBox,
  fetchRoom
}) {
  return (
    <div className='flex justify-between items-center p-2 mx-5 h-14 rounded-2xl chatListMorph px-5'>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div
        className='bg-cyan-600 p-2 text-white rounded-xl '
        onClick={() => {
          handleChatUser(user);
          handleOpenChatBox();
          fetchRoom(user.id);
        }}
      >
        <TextIcon />
      </div>
    </div>
  );
}

export default ChatHistoryList;
