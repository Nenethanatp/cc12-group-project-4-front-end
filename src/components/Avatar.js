import profileImage from '../assets/images/profile-image.png';

function Avatar({ size, src }) {
  return (
    <div>
      <img
        src={src || profileImage}
        width={size}
        height={size}
        className='rounded-full'
        alt=''
      />
    </div>
  );
}

export default Avatar;
