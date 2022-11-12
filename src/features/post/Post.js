import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, toggleReport } from '../../api/postApi';
import { getPosts, editPost, destroyPost } from '../../store/postSlice';
import { formatDate } from '../../utils/formatDate';
import PostForm from './PostForm';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
import { toast } from 'react-toastify';
import { useLoading } from '../../context/LoadingContext';

function Post({ post }) {
  const {
    id,
    content,
    createdAt,
    PostImages,
    User,
    Likes,
    Comments,
    Reports,
    typeId
  } = post;

  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { startLoading, stopLoading } = useLoading();

  const countLike = Likes.length;
  const countComment = Comments.length;

  const dispatch = useDispatch();

  const date = formatDate(createdAt);

  const me = useSelector((state) => state.auth.user);

  const likedList = Likes.map((like) => like.userId); //[1,3,2] //userId of liked post

  const reportedList = Reports.map((report) => report.userId);

  const liked = likedList?.includes(me.id);
  const [reported, setReported] = useState(reportedList.includes(me.id));
  const [isShowActions, setIsShowActions] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(id);
      dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
  };

  const handleReport = async (e) => {
    e.stopPropagation();
    try {
      await toggleReport(id);
      dispatch(getPosts());
      setReported(!reportedList.includes(me.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (post) => {
    // if (
    //   window.confirm(`Are you sure you want to delete post '${post.content}'`)
    // ) {
    try {
      dispatch(destroyPost(post.id));
    } catch (err) {
      console.log(err);
    }
    // } else {
    //   console.log('cancel');
    // }
  };

  const toggleEditPost = () => {
    setIsEditPostOpen((prev) => !prev);
  };

  const toggleShowActions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsShowActions((prev) => !prev);
  };

  const handleEditPost = (input) => {
    try {
      startLoading();
      const formData = new FormData();
      formData.append('content', input.content);
      formData.append('typeId', input.typeId);
      formData.append('userId', input.userId);
      formData.append('latitude', input.latitude);
      formData.append('longitude', input.longitude);
      for (let i = 0; i < input.postImages.length; i++) {
        formData.append('postImage', input.postImages[i]);
      }
      // console.log(formData);
      dispatch(editPost(post.id, formData));
      // then close create post pane
      toggleEditPost();
    } catch (err) {
      toast.error(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <div
        className={`flex flex-col mt-8 rounded-3xl overflow-hidden border-l-8 border-l-${
          typeId === 1
            ? 'red'
            : typeId === 2
            ? 'blue'
            : typeId === 3
            ? 'yellow'
            : ''
        }-500 customBgMorph`}
      >
        {PostImages.length !== 0 && (
          <div className='w-full'>
            <Link to={`/post/${post.id}`}>
              <img
                src={PostImages[0].imageUrl}
                alt=''
                className=' w-full object-cover'
              />
            </Link>
          </div>
        )}
        <div className='bg-white flex flex-col p-5 gap-2'>
          <div className='flex justify-between items-center'>
            <div className='text-xl font-semibold'>
              <Link to={`/post/${post.id}`}>{content}</Link>
            </div>
            <div className='relative inline-block'>
              <button onClick={toggleShowActions} className='p-5'>
                <i className='fa-solid fa-ellipsis-vertical'></i>
              </button>

              {isShowActions && (
                <div
                  onClick={toggleShowActions}
                  className='absolute right-0  w-32 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-300'
                >
                  {User.id !== me.id && (
                    <>
                      {reported ? (
                        <div
                          type='button'
                          className='block px-4 py-3 text-sm dark:text-black-300'
                        >
                          Reported
                        </div>
                      ) : (
                        <div
                          type='button'
                          className='block px-4 py-3 text-sm dark:text-black-300'
                          onClick={handleReport}
                        >
                          Report
                        </div>
                      )}
                    </>
                  )}

                  {User.id === me.id && (
                    <div
                      type='button'
                      className='block px-4 py-3 text-sm dark:text-black-300'
                      style={{ cursor: 'pointer' }}
                      onClick={toggleEditPost}
                    >
                      Edit
                    </div>
                  )}

                  {(User.id === me.id || User.role === 'admin') && (
                    <>
                      <div
                        type='button'
                        className='block px-4 py-3 text-sm dark:text-black-300'
                        style={{ cursor: 'pointer' }}
                        onClick={() => setOpenConfirm(true)}
                      >
                        Delete
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-5'>
              <div className='flex items-center gap-1 text-sm'>
                <i
                  className={`fa-regular fa-thumbs-up${
                    liked ? ' text-blue-600' : ''
                  }`}
                  onClick={handleLike}
                />
                <div>{countLike}</div>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <i className='fa-regular fa-message ' />
                <div>{countComment}</div>
              </div>
            </div>
            <div className='text-sm'>{date}</div>
          </div>
          <Link to={`/post/${post.id}`}>อ่านต่อ...</Link>
        </div>
      </div>

      <Modal
        open={isEditPostOpen}
        content={
          <PostForm
            post={post}
            handleCreatePost={handleEditPost}
            toggleCreatePost={toggleEditPost}
          />
        }
        close={toggleEditPost}
      />

      <Modal
        open={openConfirm}
        content={
          <ConfirmDelete
            postContent={post.content}
            cancel={() => {
              setOpenConfirm(false);
            }}
            confirm={() => {
              handleDeletePost(post);
            }}
          />
        }
        close={() => setOpenConfirm(false)}
      />
    </>
  );
}

export default Post;
