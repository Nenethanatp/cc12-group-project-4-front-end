import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import profileImage from '../../assets/images/profile-image.png';
import * as adminService from '../../api/adminApi';
import { toast } from 'react-toastify';

function ReportCard({ isReported, getReported }) {
  console.log(isReported);
  const { content, createdAt, User, Comments, Reports, id } = isReported;
  const { firstName, lastName, imageUrl } = User;
  const admin = useSelector((state) => state.auth.user);
  console.log(admin);
  const countComment = Comments.length;
  const reportedList = Reports.map((report) => report.userId);
  const date = formatDate(createdAt);

  const handleDeletePost = async () => {
    try {
      await adminService.deletePostApi(id);
      toast.success('success delete');
      getReported();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col border-black border-2 rounded-3xl ">
      {isReported.PostImages.length !== 0 && (
        <div className="w-full  ">
          <img
            src={isReported.PostImages[0].imageUrl}
            alt=""
            className="rounded-t-3xl w-full object-cover"
          ></img>
        </div>
      )}
      <div
        className={`${
          reportedList.length < 2 ? 'bg-white' : 'bg-orange-400'
        } flex flex-col  p-3 gap-2 ${
          isReported.PostImages.length !== 0 ? 'rounded-b-3xl' : 'rounded-3xl'
        }`}
      >
        <div className="flex justify-between items-center ">
          <div className="w-14 h-14 rounded-full">
            <img
              src={imageUrl ? imageUrl : profileImage}
              alt="userImage"
              className="w-14 h-14 object-cover rounded-full"
            />
          </div>
          <div>{`${firstName} ${lastName}`}</div>
        </div>
        <div className="text-xl font-semibold flex justify-between">
          <Link to={`/post/${isReported.id}`}>{content}</Link>
          <button
            className="text-white bg-red-500 w-20 h-10 rounded-lg"
            onClick={handleDeletePost}
          >
            Delete
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <div className="flex items-center gap-1 text-sm">
              <div className="text-lg">{`reported: ${reportedList.length}`}</div>
            </div>
          </div>
          <div className="text-sm">{date}</div>
        </div>
        <div className="flex items-center justify-between gap-1 text-sm">
          <Link to={`/post/${isReported.id}`}>อ่านต่อ...</Link>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
