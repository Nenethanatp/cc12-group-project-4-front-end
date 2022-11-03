import Avatar from '../../components/Avatar';
import TextIcon from '../../components/icons/TextIcon';
import profileImage from '../../assets/images/profile-image.png';

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
    <div
      onClick={handleSelectUser}
      className='flex w-full h-16 justify-between items-center px-3 customBgMorph py-2 rounded-xl'
    >
      <div className='flex items-center gap-3'>
        {/* <Avatar src={src} size='50' /> */}
        <img
          src={src || profileImage}
          className='w-12 h-12 rounded-full object-cover'
        />
        <div className='text-cyan-800'>
          {firstName} {lastName}
        </div>
      </div>
      <div className='customBgMorph px-3 py-2 rounded-xl bg-cyan-600 text-white'>
        <TextIcon />
      </div>
    </div>
  );
}

export default ChatUser;
