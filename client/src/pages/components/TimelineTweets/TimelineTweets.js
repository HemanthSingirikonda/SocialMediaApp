import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const TimelineTweets = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    const fetchTimelineTweets = async () => {
      try {
        const fetch = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setFeed(fetch.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTimelineTweets();
  }, [currentUser]);

  //    console.log(feed);
  return (
    <div className="mt-6">
      {feed &&
        feed.map((tweet) => {
          return (
            <div className="p-2" key={tweet._id}>
              <Tweet tweet={tweet} setData={setFeed} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweets;
