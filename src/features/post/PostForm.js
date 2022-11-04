import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoading } from '../../context/LoadingContext';
import { toast } from 'react-toastify';
import PostFormImage from './PostFormImage';
import PostFormRemoteImage from './PostFormRemoteImage';

function PostForm({ post, handleCreatePost, toggleCreatePost }) {
  const fileEl = useRef();

  const types = useSelector((state) => state.types.value);
  const location = useSelector((state) => state.map.location);

  const { startLoading, stopLoading } = useLoading();

  const user = useSelector((state) => state.auth.user);
  const [input, setInput] = useState({
    content: '',
    typeId: 1,
    userId: user.id,
    latitude: post ? post.Location.latitude : location.lat,
    longitude: post ? post.Location.longitude : location.lng,
    postImages: [],
  });

  useEffect(() => {
    if (post) {
      setInput({
        content: post.content,
        typeId: post.typeId,
        userId: post.userId,
        latitude: post.Location.latitude,
        longitude: post.Location.longitude,
        postImages: [],
      });
    }
  }, [post]);

  const handleSetPostImage = (value) => {
    setInput({ ...input, postImages: [...input.postImages, value] });
  };

  const onCreatePost = async (e) => {
    try {
      e.preventDefault();

      if (!input.content) {
        return toast.error('Content is required');
      }
      if (!input.typeId) {
        return toast.error('Type is required');
      }
      if (!input.latitude || !input.longitude) {
        return toast.error('Location is required');
      }

      startLoading();
      console.log('aj earth');
      await handleCreatePost(input);

      input.content = '';
      input.typeId = 1;
      input.userId = user.id;
      input.latitude = location.lat;
      input.longitude = location.lng;
      input.postImages = [];
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      onSubmit={onCreatePost}
      className="h-auto min-h-[70vh] w-full p-6 flex justify-center bg-white rounded-t-xl"
    >
      <div className="flex flex-col items-center w-[100%]  ">
        <div className="items-center w-full">
          <div className="h-12 w-12">
            <button
              className="bg-gray-200 rounded-full p-2 material-symbols-outlined"
              type={'button'}
              onClick={toggleCreatePost}
            >
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%] mt-5">
          <textarea
            className="bg-gray-200 w-full rounded-2xl p-4 shadow-lg"
            placeholder="what were you thinking?"
            rows="5"
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
          ></textarea>

          <div className="w-full pt-5">
            <select
              id="categoryId"
              name="categoryId"
              value={input.typeId}
              className="bg-gray-200 w-full rounded-2xl p-4 shadow-lg"
              onChange={(e) =>
                setInput({ ...input, typeId: parseInt(e.target.value) })
              }
            >
              {types.map((type, index) => (
                <option key={index} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full mt-5 max-w-[300px]">
            <div>
              {post && post.PostImages && post.PostImages.length > 0 && (
                <>
                  {post.PostImages.map((postImage, index) => {
                    return (
                      <PostFormRemoteImage
                        postImage={postImage}
                        post={post}
                        key={index}
                      />
                      // <img src={postImage.imageUrl} key={index} alt={postImage.id} style={{maxWidth: "150px"}} />
                    );
                  })}
                </>
              )}
              {input.postImages.length !== 0 &&
                input.postImages.map((postImage, index) => {
                  return (
                    <PostFormImage
                      key={index}
                      postImage={postImage}
                      index={index}
                      input={input}
                      setInput={setInput}
                    />
                  );
                })}
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileEl}
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleSetPostImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-5 w-full flex items-center">
          <div className="w-full flex flex-col gap-2">
            <button
              type="button"
              onClick={() => fileEl.current.click()}
              className="bg-blue-500 rounded-3xl p-3 text-lg font-semibold w-full text-white shadow-lg"
            >
              CHOOSE FILES
            </button>
            <button className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-full shadow-lg">
              POST
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
