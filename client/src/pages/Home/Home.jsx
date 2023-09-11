import React from 'react'
import LeftSideBar from '../components/LeftSideBar/LeftSideBar'
import MainTweet from '../components/MainTweet/MainTweet'
import {useSelector} from 'react-redux'
import Login from '../Login/Login'

const Home = () => {
  
  const currentUser=useSelector((state)=>state.user.currentUser);
  // console.log(currentUser);
  return (
    
      currentUser ? (<div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='px-6'>
        <LeftSideBar/>
      </div>
      <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
          <MainTweet/>
      </div>
    </div>) : (<Login/>)
    

    
  )
}

export default Home