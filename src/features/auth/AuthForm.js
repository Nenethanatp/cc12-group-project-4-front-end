import { useState } from 'react';
import Modal from '../../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthForm() {
  const [openRegister, setOpenRegister] = useState(false);
  return (
    <div>
      <LoginForm />
      <button onClick={() => setOpenRegister(true)}>REGISTER</button>
      <Modal
        open={openRegister}
        content={<RegisterForm close={() => setOpenRegister(false)} />}
        close={() => setOpenRegister(false)}
      />
    </div>
  );
}

export default AuthForm;
