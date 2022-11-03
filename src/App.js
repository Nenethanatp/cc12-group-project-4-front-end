import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './route/Router';
import { ToastContainer } from 'react-toastify';
import { getMe } from './store/authSlice';
import * as authService from './api/authApi';
import { getAccessToken } from './utils/localStorage';
import { getPosts, setPosts } from './store/postSlice';
import { getFavorites, setFavorites } from './store/favoriteSlice';
import { useLoading } from './context/LoadingContext';
import { getEndDate, setEndDate } from './store/subscribeSlice';
import Spinner from './components/Spinner';
import * as postService from './api/postApi';
import * as userService from './api/userApi';
import * as subscriptionApi from './api/subscriptionApi';

function App() {
  const libraries = useMemo(() => ['places'], []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const { startLoading, stopLoading, loading } = useLoading();

  useEffect(() => {
    const getUser = () => async (dispatch) => {
      const res = await authService.getMe();
      dispatch(getMe(res.data));
    };

    const fetchAll = async () => {
      if (getAccessToken()) {
        startLoading();
        const resAll = await Promise.all([
          authService.getMe(),
          postService.getAll(),
          userService.getFavorites(),
          subscriptionApi.getEndDate(),
        ]);
        // dispatch(getUser());
        // dispatch(getPosts());
        // dispatch(getFavorites());
        // dispatch(getEndDate());
        dispatch(getMe(resAll[0].data));
        dispatch(setPosts(resAll[1].data.posts));
        dispatch(setFavorites(resAll[2].data.favorites));
        dispatch(setEndDate(resAll[3].data.endDate));

        stopLoading();
      }
    };
    fetchAll();
  }, [isLogin]);

  if (loadError) return <div>Load Error</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {loading ? (
        <Spinner />
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
