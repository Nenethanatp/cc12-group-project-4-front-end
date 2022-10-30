import Avatar from '../../components/Avatar';
import profileImage from '../../assets/images/profile-image.png';

function ChatReceiver({ src, size, message }) {
  return (
    <div className='flex justify-start items-end gap-3'>
      {/* <Avatar size={size} src={src} /> */}
      <img
        src={src || profileImage}
        className={`rounded-full w-[${size}px] h-[${size}px] object-cover customBgMorph`}
      />
      <div className='max-w-[70%] grow-0 break-words text-white rounded-2xl p-2 rounded-bl-none chatReceiverMorph'>
        {message}
      </div>
    </div>
  );
}

export default ChatReceiver;
