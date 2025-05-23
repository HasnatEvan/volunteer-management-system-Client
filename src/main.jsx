import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/Router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <div className='max-w-screen-xl mx-auto bg-white'>
  <RouterProvider router={router} />
  </div>
    </AuthProvider>
  </StrictMode>,
)
