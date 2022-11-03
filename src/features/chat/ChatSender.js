function ChatSender({ message }) {
  return (
    <div className='flex justify-end items-center'>
      <div className='max-w-[80%] grow-0 break-words text-white px-3 py-2 rounded-2xl rounded-br-none chatSenderMorph'>
        {message}
      </div>
    </div>
  );
}

export default ChatSender;
