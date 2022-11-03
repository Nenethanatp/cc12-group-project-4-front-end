import { useState } from 'react';
import * as userService from '../../api/userApi';
import BackIcon from '../../components/icons/BackIcon';

function ChatSearchBar({ searchUsers, openChatHistory }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userService.getUserByName(input);
    searchUsers(res.data.users);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center gap-2 pb-5 shadow-md'>
        <button
          type='button'
          className='customBgMorph flex justify-center items-center w-10 h-10 rounded-full text-red-500'
          onClick={openChatHistory}
        >
          <BackIcon />
        </button>
        <input
          type='text'
          placeholder='Search for user'
          className='bg-gray-300 w-[60vw] h-10 rounded-full p-5 customBgMorph'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='bg-yellow-500 text-white px-3 h-[40px] rounded-full customBgMorph'>
          Search
        </button>
      </div>
    </form>
  );
}

export default ChatSearchBar;
