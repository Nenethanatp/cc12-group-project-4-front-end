import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { gapi } from 'gapi-script';
import LoginGoogle from '../../components/LoginGoogle';
import LogoutGoogle from '../../components/LogoutGoogle';

const clientId =
  '713136136398-r4nrmvg52fnsad1f466mnnq48ldh1862.apps.googleusercontent.com';

function LoginForm() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
  });

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
          className='bg-gray-200 h-11 w-[320px] px-5 shadow-md'
          placeholder='Email'
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type='password'
          className='bg-gray-200 h-11 w-[320px] px-5 shadow-md'
          placeholder='Password'
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <div className='basis-2/5 flex flex-col justify-center gap-3'>
          <button className='bg-yellow-400 w-[320px] h-12 rounded-full font-bold text-lg text-gray-700 shadow-md'>
            LOG IN
          </button>
          <div className='flex justify-center'>
            <LoginGoogle />
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
