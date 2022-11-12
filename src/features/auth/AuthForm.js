import { useState } from 'react';
import Modal from '../../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from '../../assets/images/justlogo.png';

function AuthForm() {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className='flex flex-col justify-end h-[100vh]'>
      <div className='bg-white h-[30vh] flex justify-center items-center'>
        <img src={logo} className='w-52 h-52 mt-10' />
      </div>
      <div className=' h-[70vh] flex flex-col items-center p-5 gap-5'>
        <LoginForm />
        <div className='flex justify-end items-start w-full px-[15px] pb-3'>
          <span className='pr-2'>Not a member?</span>
          <button
            onClick={() => setOpenRegister(true)}
            className='text-yellow-500 drop-shadow-md'
          >
            Sign up now
          </button>
        </div>
        <Modal
          open={openRegister}
          content={<RegisterForm close={() => setOpenRegister(false)} />}
          close={() => setOpenRegister(false)}
        />
      </div>
    </div>
  );
}

export default AuthForm;
