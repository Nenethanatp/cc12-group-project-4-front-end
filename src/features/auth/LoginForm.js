import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { gapi } from 'gapi-script';
import LoginGoogle from '../../components/LoginGoogle';
import { toast } from 'react-toastify';

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

    if (!input.email && !input.password) {
      return toast.error('Email and password is required');
    }

    if (!input.email) {
      return toast.error('Email is required');
    }
    if (!input.password) {
      return toast.error('Password is required');
    }
    dispatch(login(input));
    setInput({
      email: '',
      password: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex">
      <div className="flex flex-col items-center gap-5">
        <div className="text-2xl font-bold m-5 drop-shadow-md">SIGN IN</div>
        <input
          className="bg-gray-200 h-11 w-[320px] px-5 shadow-lg outline-green-500"
          placeholder="Email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type="password"
          className="bg-gray-200 h-11 w-[320px] px-5 shadow-lg outline-green-500"
          placeholder="Password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <div className="basis-2/5 flex flex-col justify-center gap-3">
          <button className="bg-yellow-400 w-[320px] h-12 rounded-full font-bold text-lg text-gray-700 shadow-lg">
            LOG IN
          </button>
          <div className="flex justify-center">
            <LoginGoogle />
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
