import {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {getPosts, getPostById} from "../../store/postSlice";
import {formatDate} from "../../utils/formatDate";
import {toggleLike, toggleReport} from "../../api/postApi";
import * as postService from "../../api/postApi";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import PostDetailGallery from "./PostDetailGallery";
import PostDetailComment from "./PostDetailComment";
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api';

function PostDetail() {
  const mapRef = useRef();

  const dispatch = useDispatch();
  const {postId} = useParams();

  const [mapCenter, setMapCenter] = useState({lat: 13.75, lng: 100.5})

  const [post, setPost] = useState({
    User: {
      firstName: "",
      lastName: "",
    },
    PostImages: [],
    Likes: [],
    Comments: [],
    Type: {type: ''},
    Location: {latitude: 13.75, longitude: 100.5},
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
  const onMapClick = useCallback(
    (e) => {
      // setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      // dispatch(setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() }));
    },
    [dispatch]
  );

  useEffect(() => {
    setPost(posts.find((post) => post.id === Number(postId)));
  }, [posts, postId]);

  useEffect(() => {
    setMapCenter({
      lat: +post.Location.latitude,
      lng: +post.Location.longitude,
    })
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
        <div className="bg-white flex flex-col p-5 gap-2 rounded-b-3xl">
          <Link to={`/profile/${post.User.id}`}>
            <div className="flex gap-3 ">
              <div className="">
                {post.User && (
                  <img
                    src={post.User.imageUrl}
                    alt=""
                    className="bg-orange-500 rounded-full w-[40px] h-[40px]  object-cover"
                  ></img>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-md">{`${post.User.firstName} ${post.User.lastName}`}</div>
              </div>
            </div>
          </Link>

          <div className="text-lg font-semibold mt-5">{post.content}</div>

          <p className="text-base font-medium">Location</p>
          <div style={{height: '500px'}}>
            <GoogleMap
              zoom={11}
              center={mapCenter}
              mapContainerClassName="h-full w-full"
              options={options}
              onLoad={onMapLoad}
              onClick={onMapClick}
            >
              <Marker
                key={post.id}
                position={{ lat: +post.Location.latitude, lng: +post.Location.longitude }}
                onClick={() => {
                }}
              />
            </GoogleMap>
          </div>

          <p className="text-base font-medium">Gallery</p>
          {post && <PostDetailGallery post={post}></PostDetailGallery>}

          <hr/>
          <div className="w-[100%]">
            <div className="float-left">
              <span>หมวดหมู่ {post.Type.type}</span>
            </div>
            <div className="float-right">
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
