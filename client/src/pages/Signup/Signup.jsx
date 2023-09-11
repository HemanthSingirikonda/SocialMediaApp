import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const res=await axios.post('/auth/signup',{
          username,email,password
        });
        console.log(res.data);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-6/12 mx-auto gap-10'>
      <h2 className='text-center text-2xl font-bold'>Sign up</h2>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' required className='text-l px-4 py-2 rounded-full'></input>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username' className='text-l px-4 py-2 rounded-full'></input>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password' className='text-l px-4 py-2 rounded-full'></input>
      <button className='text-l py-2 px-4 rounded-full bg-blue-500 text-white' onClick={handleSubmit} >Sign up</button>
      <p className='text-l text-center'>Already a registered user? click <Link to='/Login' className='font-bold'>here</Link> to Login</p>      
    </form>
  )
}

export default Signup