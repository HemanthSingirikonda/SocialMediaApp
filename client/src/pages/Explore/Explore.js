import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../Login/Login';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import ExploreTweets from '../components/ExploreTweets/ExploreTweets';

const Explore = () => {
    let currentUser=useSelector((state)=>state.user.currentUser);
  return (
    <>
    {
        (!currentUser) ? <Login/> : (
            <>
                <div className='grid grid-cols-1 md:grid-cols-4'>
                    <div className='px-6'>
                        <LeftSideBar/>
                    </div>
                    <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
                        <ExploreTweets/>
                    </div>
                </div>
            </>
        ) 
    }
    </>
  )
}

export default Explore