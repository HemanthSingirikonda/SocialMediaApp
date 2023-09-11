import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const ExploreTweets = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [ExploreTweets, setExploreTweets] = useState(null);
  useEffect(() => {
    const fetchfunction = async () => {
      try {
        const res = await axios.get("/tweets/explore");
        setExploreTweets(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchfunction();
  }, []);
  return (
    <div className="mt-6">
      {ExploreTweets &&
        ExploreTweets.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setExploreTweets} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
