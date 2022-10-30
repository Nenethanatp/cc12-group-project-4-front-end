import { useState } from 'react';
import { register } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function RegisterForm({ close }) {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.firstName) {
      return toast.error('First name is required');
    }
    if (!input.lastName) {
      return toast.error('Last name is required');
    }
    if (!input.email) {
      return toast.error('Email is required');
    }
    if (!input.password) {
      return toast.error('Password is required');
    }
    if (!input.confirmPassword) {
      return toast.error('Confirm password is required');
    }

    if (input.password !== input.confirmPassword) {
      return toast.error('Password and confirm password does not match');
    }

    dispatch(register(input));
    setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    close();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full p-5 flex justify-center bg-white "
    >
      <div className="flex flex-col items-center gap-5 w-[100%]">
        <div className="text-2xl font-bold m-5">REGISTER AN ACCOUNT</div>
        <div className="flex flex-col items-center gap-5">
          <input
            className="bg-gray-200 h-11 w-[320px] px-5 shadow-lg outline-green-500"
            placeholder="First Name"
            value={input.firstName}
            onChange={(e) => setInput({ ...input, firstName: e.target.value })}
          />
          <input
            className="bg-gray-200 h-11 w-[320px] px-5 shadow-lg outline-green-500"
            placeholder="Last Name"
            value={input.lastName}
            onChange={(e) => setInput({ ...input, lastName: e.target.value })}
          />
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
          <input
            type="password"
            className="bg-gray-200 h-11 w-[320px] px-5 shadow-lg outline-green-500"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({ ...input, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="h-[140px] flex items-center">
          <button className="bg-yellow-400 w-[320px] h-12 rounded-full font-bold text-lg shadow-lg mt-12">
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
