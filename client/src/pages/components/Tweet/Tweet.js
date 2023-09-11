import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTweet from "../EditTweet/EditTweet";

const Tweet = ({ tweet, setData }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [tweetUserData, setTweetUserData] = useState();
  const [showModal, setShowModal] = useState(false);
  const dateStr = format(new Date(tweet.createdAt), "dd/MM/yyyy HH:mm:ss");
  // console.log(dateStr);
  const location = useLocation().pathname;
  const { id } = useParams();
  let description = tweet.description;
  let tweetId = tweet._id;
  // console.log(description);

  useEffect(() => {
    const fetch = async () => {
      try {
        const tweetUser = await axios.get(`/users/find/${tweet.userId}`);
        setTweetUserData(tweetUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [tweet.userId, tweet.likes]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  const handleLike = async (e) => {
    e.preventDefault();
    // console.log('clicked');
    try {
      await axios.put(`/tweets/lod/${tweet._id}`, {
        id: user._id.toString(),
      });
      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${user._id}`);
        setData(newData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {tweetUserData && (
        <div className="border-b-2">
          <div className="flex space-x-2">
            <Link to={`/profile/${tweetUserData._id}`}>
              <h3 className="font-bold">{tweetUserData.username}</h3>
            </Link>
            <span className="font-thin">@{tweetUserData.username}</span>
            <p className="font-thin"> -{dateStr}</p>
          </div>
          <p>{tweet.description} </p>

          <button onClick={handleLike}>
            {tweet.likes.includes(user._id) ? (
              <FavoriteIcon
                className="mr-2 my-2 cursor-pointer"
                htmlColor="red"
              />
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
            )}
            {tweet.likes.length}
          </button>
          {location.includes("profile") &&
            tweet.userId === user._id.toString() && (
              <>
                <EditIcon
                  className="ml-5 cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
                <span
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  |
                </span>
                <DeleteIcon
                  className="cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              </>
            )}
          {showModal && (
            <EditTweet
              setVisibility={setShowModal}
              desc={description}
              id={id}
              tweetId={tweetId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tweet;
