import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Router from './route/Router';
import { ToastContainer } from 'react-toastify';
import { getMe } from './store/authSlice';
import * as authService from './api/authApi';
import { getAccessToken } from './utils/localStorage';
import { getPosts } from './store/postSlice';
import { getFavorites } from "./store/favoriteSlice";
import { useLoading } from './context/LoadingContext';
import { getEndDate } from './store/subscribeSlice';

function App() {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const dispatch = useDispatch();
  const { startLoading, stopLoading, loading } = useLoading();

  useEffect(() => {
    const getUser = () => async (dispatch) => {
      const res = await authService.getMe();
      dispatch(getMe(res.data));
    };
    if (getAccessToken()) {
      startLoading();
      dispatch(getUser());
      dispatch(getPosts());
      dispatch(getFavorites());
      dispatch(getEndDate());
      stopLoading();
    }
  }, [dispatch]);

  if (loadError) return <div>Load Error</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <>
          <Router />
          <ToastContainer
            autoClose="5000"
            theme="colored"
            position="bottom-center"
          />
        </>
      )}
    </>
  );
}

export default App;
