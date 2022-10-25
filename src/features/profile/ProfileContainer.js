import ProfileInfo from './ProfileInfo';
import ProfileNav from '../../layout/profile/ProfileNav';

function ProfileContainer() {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <ProfileInfo />
        <ProfileNav />
      </div>
    </div>
  );
}

export default ProfileContainer;
