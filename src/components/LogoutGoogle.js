import { GoogleLogout } from 'react-google-login';

const clientId =
  '713136136398-r4nrmvg52fnsad1f466mnnq48ldh1862.apps.googleusercontent.com';

function LogoutGoogle() {
  const onSuccess = () => {
    console.log('Log out successful');
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText={'Logout'}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutGoogle;
