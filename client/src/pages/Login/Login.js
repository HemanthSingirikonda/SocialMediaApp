import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginStart,loginFailure,loginSuccess } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res=await axios.post('/auth/signin',{
                username,password
            });
            dispatch(loginSuccess(res.data));
            // console.log(res.data);
            navigate('/'); 
        } catch (error) {
            dispatch(loginFailure());
            console.log(error);
        }
    
    }


  return (
    <form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-6/12 mx-auto gap-10'>
      <h2 className='text-center text-2xl font-bold'>Login</h2>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username' className='text-l px-4 py-2 rounded-full'></input>
      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' className='text-l px-4 py-2 rounded-full'></input>
      <button className='text-l py-2 px-4 rounded-full bg-blue-500 text-white' onClick={handleSubmit}>Login</button>
      <p className='text-l text-center'>Not a registered user? click <Link to='/Signup' className='font-bold'>here</Link> to Sign up</p>  
    </form>
  )
}

export default Login