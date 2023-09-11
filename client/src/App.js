import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Navbar from './pages/components/Navbar/Navbar';
import Error from './pages/Error/Error';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Explore from './pages/Explore/Explore';


const Layout=()=>{
  return (
    <div className='md:w-8/12 mx-auto'>
      <Navbar/>
      <Outlet></Outlet>
    </div>
  )
};

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/signout',
        element:<Login/>
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/explore',
        element:<Explore/>
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
