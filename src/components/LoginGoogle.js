import { GoogleLogin } from 'react-google-login';
import * as authService from '../api/authApi';
import { addAccessToken, getAccessToken } from '../utils/localStorage';

const clientId =
  '713136136398-r4nrmvg52fnsad1f466mnnq48ldh1862.apps.googleusercontent.com';

function LoginGoogle() {
  const onSuccess = async (res) => {
    try {
      if (getAccessToken()) {
        return alert('please logout before login');
      }
      const result = await authService.loginGoogle({
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        email: res.profileObj.email,
        googleId: res.profileObj.googleId
      });
      addAccessToken(result.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const onFailure = (res) => {
    console.log('login failed', res);
  };

  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;
