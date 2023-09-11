import { useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import TimelineTweets from '../TimelineTweets/TimelineTweets';
import axios from 'axios';

const MainTweet = () => {
  
  const currentUser=useSelector((state)=>state.user.currentUser);
  const [description,setDescription]=useState('');

  const submitTweet=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`/tweets`,{
        userId: currentUser._id,
        description:description
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    // const res=await axios.post('/tweets/')
  }

  return (
    <div>
        {
          currentUser && (<p className='font-bold pl-2 my-2'>{currentUser.username}</p>)
        }
        
        <form className='border-b-2 pb-5'>
            <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)} 
            type='text'
            placeholder="What's happening"
            maxLength={300}
            className='bg-slate-200 rounded-lg w-full p-2'></textarea>
            <button className='bg-blue-500 text-white py-2 px-4 rounded-full ml-auto mt-3' onClick={submitTweet}>Tweet</button>
        </form>
        <TimelineTweets/>
    </div>
  )
}

export default MainTweet