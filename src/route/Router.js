import { Navigate, Routes, Route } from 'react-router-dom';
import AuthLayout from '../layout/auth/AuthLayout';
import ProfileLayout from '../layout/profile/ProfileLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SavePlacePage from '../pages/SavePlacePage';
import SubscriptionPage from '../pages/SubscriptionPage';

function Router() {
  const user = false; // redux state

  return (
    <Routes>
      {user ? (
        <>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile/:id' element={<ProfileLayout />}>
              <Route path='/map' element={<HomePage />} />
              <Route path='/savePlace' element={<SavePlacePage />} />
            </Route>
            <Route path='/subscription' element={<SubscriptionPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </>
      ) : (
        <>
          <Route path='/' element={<LoginPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
