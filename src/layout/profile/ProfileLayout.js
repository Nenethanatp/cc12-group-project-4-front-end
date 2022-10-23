import { Outlet } from 'react-router-dom';
import ProfileContainer from '../../features/profile/ProfileContainer';

function ProfileLayout() {
  return (
    <>
      <ProfileContainer />
      <Outlet />
    </>
  );
}

export default ProfileLayout;
