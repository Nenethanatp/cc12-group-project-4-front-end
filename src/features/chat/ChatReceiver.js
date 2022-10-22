import Avatar from '../../components/Avatar';

function ChatReceiver({ src, size, message }) {
  return (
    <div className='flex justify-start items-end gap-3'>
      <Avatar size={size} />
      <div className='max-w-[70%] grow-0 break-words bg-blue-500 text-white rounded-2xl p-2 rounded-bl-none'>
        {message}
      </div>
    </div>
  );
}

export default ChatReceiver;
