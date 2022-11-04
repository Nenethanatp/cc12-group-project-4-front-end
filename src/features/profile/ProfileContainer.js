import ProfileInfo from "./ProfileInfo";
import ProfileNav from "../../layout/profile/ProfileNav";
import { useEffect, useState } from "react";
import * as followService from "../../api/followApi";
import * as getUserService from "../../api/authApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowList from "../../layout/profile/FollowList";
import PostList from "../post/PostList";
import { useLoading } from "../../context/LoadingContext";

function ProfileContainer() {
  const { startLoading, stopLoading } = useLoading();

  const [otherUser, setOtherUser] = useState(null);
  const [follow, setFollow] = useState(null);
  const [allFollower, setAllFollower] = useState([]);
  const [isFollow, setIsFollow] = useState([]);
  const [isPost, setIsPost] = useState(true);
  const { userId } = useParams();
  const me = useSelector((state) => state.auth.user);
  const allPosts = useSelector((state) => state.post.items);
  let myPosts;
  if (allPosts) {
    myPosts = allPosts.filter((item) => item.userId === +userId);
  }

  const openPost = () => {
    setIsPost(true);
  };

  const fetchFollow = async () => {
    try {
      const res = await followService.getFollow();
      setIsFollow(res.data.follow);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async (id) => {
    try {
      const res = await getUserService.getUserById(id);
      setOtherUser(res.data.user);
      if (me === otherUser) {
        return setOtherUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllFollower = async () => {
    try {
      const res = await followService.getAllFollowApi(userId);
      setAllFollower(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      startLoading();
      const fetchAll = async () => {
        await fetchUser(userId);
        await fetchFollow();
        await getAllFollower();
      };
      fetchAll();
      setIsPost(true);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  }, [userId]);

  const followUser = (isFollow || []).map((el) => el.followingId);
  const followed = followUser.includes(otherUser?.id);

  const handleFollow = async () => {
    try {
      const res = await followService.toggleFollow(userId);
      setFollow(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickFollow = async () => {
    await getAllFollower();
    await fetchFollow();
    setIsPost(false);
  };

  return (
    <div>
      <div className="flex flex-col ">
        <ProfileInfo />

        <ProfileNav
          allFollower={allFollower}
          isFollow={isFollow}
          follow={follow}
          followed={followed}
          handleClickFollow={handleClickFollow}
          openPost={openPost}
        />

        {isPost ? (
          <div className="p-6 bg-gray-200">
            <PostList myPosts={myPosts} />
          </div>
        ) : (
          <FollowList
            allFollower={allFollower}
            isFollow={isFollow}
            follow={follow}
            followed={followed}
            handleClickFollow={handleClickFollow}
            openPost={openPost}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileContainer;
