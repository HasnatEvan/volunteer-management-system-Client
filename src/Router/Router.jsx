import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../Error/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddVolunteer from "../Pages/AddVolunteer";
import AllVolunteerPost from "../Pages/AllVolunteerPost";
import PostDetails from "../Pages/Components/PostDetails";
import PrivateRoute from "./PrivateRoute";
import BeAVolunteerModal from "../Pages/Components/BeAVolunteerModal";
import ManageMyPosts from "../Pages/ManageMyPosts";
import Update from "../Pages/Components/Update";
import EditProfile from "../Pages/EditProfile";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
            
        },
        {
           path:'/login',
           element:<Login></Login>
        },
        {
           path:'/register',
           element:<Register></Register>
        },
        {
          path:'/add-post',
          element:<AddVolunteer></AddVolunteer>
        },
        {
          path:'/allPosts',
          element:<AllVolunteerPost></AllVolunteerPost>,
          loader:()=>fetch('https://volunteer-management-website-server.vercel.app/volunteers')
        },
        {
          path:'/volunteers/:id',
          element:<PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
          loader:({params})=> fetch(`https://volunteer-management-website-server.vercel.app/volunteers/${params.id}`)
        },
        {
          path:'/beAVolunteerModal/:id',
          element:<PrivateRoute><BeAVolunteerModal></BeAVolunteerModal></PrivateRoute>,
          loader:({params})=> fetch(`https://volunteer-management-website-server.vercel.app/volunteers/${params.id}`)
        },
        {
          path:'/manage-posts',
          element:<PrivateRoute><ManageMyPosts></ManageMyPosts></PrivateRoute>,
        },
        {
           path:'/update/:id',
           element:<Update></Update>,
           loader: ({params})=> fetch(`https://volunteer-management-website-server.vercel.app/volunteers/${params.id}`)
        },
        {
          path:'/edit-profile',
          element:<PrivateRoute><EditProfile></EditProfile></PrivateRoute>
        }
      ]
    },
  ]);


  export default router;