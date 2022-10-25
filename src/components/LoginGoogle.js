import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../store/authSlice';

const clientId =
  '713136136398-r4nrmvg52fnsad1f466mnnq48ldh1862.apps.googleusercontent.com';

function LoginGoogle() {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    try {
      dispatch(
        googleLogin({
          firstName: res.profileObj.givenName,
          lastName: res.profileObj.familyName,
          email: res.profileObj.email,
          googleId: res.profileObj.googleId
        })
      );
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
        isSignedIn={false}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='bg-green-500 w-[320px] h-12 rounded-full font-bold text-md text-white shadow-lg'
          >
            LOG IN WITH GOOGLE ACCOUNT
          </button>
        )}
      />
    </div>
  );
}

export default LoginGoogle;
