import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

function LoginForm() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
    setInput({
      email: '',
      password: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className='h-full flex'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-2xl font-bold m-5'>SIGN IN</div>
        <input
          className='bg-gray-200 h-11 w-[320px] px-5'
          placeholder='Email'
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type='password'
          className='bg-gray-200 h-11 w-[320px] px-5'
          placeholder='Password'
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <div className='basis-2/5 flex items-center'>
          <button className='bg-yellow-400 w-[320px] h-12 rounded-full font-bold text-lg'>
            LOG IN
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
