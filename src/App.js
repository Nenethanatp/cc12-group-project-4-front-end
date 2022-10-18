import Router from './route/Router';
import { ToastContainer } from 'react-toastify';
import { getMe } from './store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authService from './api/authApi';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = () => async (dispatch) => {
      const res = await authService.getMe();
      dispatch(getMe(res.data.user));
    };
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Router />
      <ToastContainer
        autoClose='5000'
        theme='colored'
        position='bottom-center'
      />
    </>
  );
}

export default App;
