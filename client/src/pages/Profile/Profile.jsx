import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../components/Tweet/Tweet";
import EditProfileModal from "../components/EditProfileModal/EditProfileModal";
import { following, unfollowing } from "../../redux/userSlice";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const [userTweets, setUserTweets] = useState(null);
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${id}`);
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        setUserProfile(userProfile.data);
        setUserTweets(userTweets.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFunction();
  }, [currentUser, id]);

  if (!currentUser) {
    return null;
  }

  const handleFollow = async () => {
    try {
      const res = await axios.put(`/users/follow/${id}`, {
        id: currentUser._id.toString(),
      });
      dispatch(following(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await axios.put(`/users/unfollow/${id}`, {
        id: currentUser._id.toString(),
      });
      dispatch(unfollowing(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="px-6">
        <LeftSideBar />
      </div>
      <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
        {userProfile && (
          <div className="font-bold text-4xl -y-2 my-3">
            {userProfile.username}
          </div>
        )}

        <div className="flex justify-between items-center border-b-2 pb-5">
          {currentUser._id === id ? (
            <button
              className="px-4 -y-2 bg-red-500 rounded-full text-white"
              onClick={() => setshowModal(true)}
            >
              Delete Profile
            </button>
          ) : currentUser.following.includes(id) ? (
            <button
              className="px-4 -y-2 bg-red-500 rounded-full text-white"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="px-4 -y-2 bg-blue-500 rounded-full text-white"
              onClick={handleFollow}
            >
              Follow
            </button>
          )}
        </div>
        <div>
          {showModal && <EditProfileModal setVisibility={setshowModal} />}
        </div>
        <div className="mt-6">
          {userTweets &&
            userTweets.map((tweet) => {
              return (
                <div className="p-2" key={tweet._id}>
                  <Tweet tweet={tweet} setData={setUserTweets} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
