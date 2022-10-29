import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import AuthLayout from '../layout/auth/AuthLayout';
import ProfileLayout from '../layout/profile/ProfileLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SavePlacePage from '../pages/SavePlacePage';
import SubscriptionPage from '../pages/SubscriptionPage';
import PostDetailPage from '../pages/PostDetailPage';
import ProfileAdminInfo from '../features/profile/admin/ProfileAdminInfo';
import ReportedPage from '../pages/ReportedPage';

function Router() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            <Route path={`/profile/:userId`} element={<ProfileLayout />}>
              <Route path="map" element={<HomePage />} />
              <Route path="savePlace" element={<SavePlacePage />} />
            </Route>
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            {user.role === 'admin' ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/reported" element={<ReportedPage />} />
                <Route
                  path="/editProfile/:userId"
                  element={<ProfileAdminInfo />}
                />
              </>
            ) : (
              <></>
            )}
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </>
      )}
    </Routes>
  );
}

export default Router;
