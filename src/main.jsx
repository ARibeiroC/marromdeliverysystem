import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/base.css'
import { RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom'

// IMPORT ROUTES
import { ErrorPage } from './routes/Error/index.jsx'
import { Delivery } from './routes/Delivery/Delivery.jsx'
import {RegisterExit} from './routes/RegisterExit/RegisterExit.jsx'
import { AdminLogin } from './routes/Admin/AdminLogin.jsx'
import { Welcome } from './routes/Welcome/Welcome.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: '/',
        element: <Navigate to='/delivery' />
      },
      {
        path: '/delivery',
        element: <Delivery />,
        children: [
          {
            path: '/delivery',
            element: <Navigate to='/delivery/welcome'/>,
          },
          {
            path: '/delivery/welcome',
            element: <Welcome />
          },
          {
            path: '/delivery/register-exit',
            element: <RegisterExit />
          },
          {
            path: '/delivery/admin',
            element: <AdminLogin />
          }
        ]
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
