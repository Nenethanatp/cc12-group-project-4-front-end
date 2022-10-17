import { Outlet } from "react-router-dom";
import ProfileContainer from "../../features/profile/ProfileContainer";
import ProfileNav from "./ProfileNav";

function ProfileLayout() {
  return (
    <>
      <ProfileContainer />
      <ProfileNav />
      <Outlet />
    </>
  );
}

export default ProfileLayout;
