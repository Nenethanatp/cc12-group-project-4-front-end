import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Router from "./route/Router";
import { getMe } from "./store/authSlice";
import * as authService from "./api/authApi";
import { getAccessToken } from "./utils/localStorage";
import { getPosts } from "./store/postSlice";

function App() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = () => async (dispatch) => {
      const res = await authService.getMe();
      dispatch(getMe(res.data.user));
    };
    if (getAccessToken()) {
      dispatch(getUser());
      dispatch(getPosts());
    }
  }, [dispatch]);

  if (loadError) return <div>Load Error</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Router />
      <ToastContainer
        autoClose="5000"
        theme="colored"
        position="bottom-center"
      />
    </>
  );
}

export default App;
