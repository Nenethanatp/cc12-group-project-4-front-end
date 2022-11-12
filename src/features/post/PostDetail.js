import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { getPosts, getPostById } from '../../store/postSlice';
import { formatDate } from '../../utils/formatDate';
import { toggleLike } from '../../api/postApi';
import * as postService from '../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostDetailGallery from './PostDetailGallery';
import PostDetailComment from './PostDetailComment';
import { GoogleMap, Marker } from '@react-google-maps/api';

function PostDetail() {
  const mapRef = useRef();

  const dispatch = useDispatch();
  const { postId } = useParams();

  const [mapCenter, setMapCenter] = useState({ lat: 13.75, lng: 100.5 });

  const [post, setPost] = useState({
    User: {
      firstName: '',
      lastName: ''
    },
    PostImages: [],
    Likes: [],
    Comments: [],
    Type: { type: '' },
    Location: { latitude: 13.75, longitude: 100.5 }
  });
  const me = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.items);

  const likedList = post?.Likes?.map((like) => like.userId);
  const liked = likedList?.includes(me.id);

  const options = useMemo(
    () => ({
      mapId: '3713c985864a0e82',
      disableDefaultUI: true,
      clickableIcons: false
    }),
    []
  );

  const onMapLoad = useCallback((map) => (mapRef.current = map), []);

  useEffect(() => {
    setPost(posts.find((post) => post.id === Number(postId)));
  }, [posts, postId]);

  useEffect(() => {
    setMapCenter({
      lat: +post.Location.latitude,
      lng: +post.Location.longitude
    });
  }, [post]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(post.id);
      dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {post && (
        <div className='bg-slate-200 flex flex-col p-5 gap-2 rounded-b-3xl'>
          <Link to={`/profile/${post.User.id}`}>
            <div className='flex gap-3 '>
              <div className=''>
                {post.User && (
                  <img
                    src={post.User.imageUrl}
                    alt=''
                    className='bg-orange-500 rounded-full w-[40px] h-[40px]  object-cover'
                  ></img>
                )}
              </div>
              <div className='flex flex-col justify-center'>
                <div className='text-md'>{`${post.User.firstName} ${post.User.lastName}`}</div>
              </div>
            </div>
          </Link>

          <div className='text-lg text-cyan-600 font-semibold my-5 customBgMorph text-center p-2 rounded-xl'>
            {post.content}
          </div>

          <div style={{ height: '250px' }} className='customBgMorph'>
            <GoogleMap
              zoom={11}
              center={mapCenter}
              mapContainerClassName='h-full w-full'
              options={options}
              onLoad={onMapLoad}
            >
              <Marker
                key={post.id}
                position={{
                  lat: +post.Location.latitude,
                  lng: +post.Location.longitude
                }}
                onClick={() => {}}
              />
            </GoogleMap>
          </div>

          {post && <PostDetailGallery post={post}></PostDetailGallery>}

          <hr />
          <div className='w-[100%]'>
            <div className='float-left'>
              <span>category: {post.Type.type}</span>
            </div>
            <div className='float-right'>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          {post && (
            <PostDetailComment
              post={post}
              liked={liked}
              handleLike={handleLike}
            ></PostDetailComment>
          )}
        </div>
      )}
    </>
  );
}

export default PostDetail;
