import Avatar from '../../components/Avatar';

function ChatUser({
  src,
  firstName,
  lastName,
  item,
  openChatBox,
  selectChatUser,
  fetchRoom
}) {
  const handleSelectUser = () => {
    selectChatUser(item);
    fetchRoom(item.id);
    openChatBox();
  };

  return (
    <div onClick={handleSelectUser} className='flex flex-col items-center'>
      <Avatar src={src} size='80' />
      <div>{firstName}</div>
      <div>{lastName}</div>
    </div>
  );
}

export default ChatUser;
