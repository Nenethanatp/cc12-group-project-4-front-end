function ChatSender({ message }) {
  return (
    <div className='flex justify-end items-center'>
      <div className='max-w-[80%] grow-0 break-words bg-green-500 text-white p-2 rounded-2xl rounded-br-none'>
        {message}
      </div>
    </div>
  );
}

export default ChatSender;
