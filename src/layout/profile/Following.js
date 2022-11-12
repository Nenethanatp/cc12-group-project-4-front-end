import { Link } from 'react-router-dom';
import profileImage from '../../assets/images/profile-image.png';

function Following({
  el: {
    Following: { imageUrl, firstName, lastName, id }
  }
}) {
  return (
    <div className='flex items-center customBgMorph px-3 py-2 rounded-2xl'>
      <Link to={`/profile/${id}`}>
        <div>
          <img
            src={imageUrl ? imageUrl : profileImage}
            alt=''
            className='rounded-full w-[50px] h-[50px]  object-cover mr-4'
          />
        </div>
      </Link>
      <Link to={`/profile/${id}`}>
        <div>{`${firstName} ${lastName}`}</div>
      </Link>
    </div>
  );
}

export default Following;
