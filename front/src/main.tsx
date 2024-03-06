import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout.tsx'
import './styles/index.css'
import LogIn from './Components/LogIn.tsx';
import HomePage from './Components/HomePage.tsx';
import SignUp from './Components/SignUp.tsx';
import Dashboard from './Components/Dashboard.tsx';
import MainLayout from './MainLayout.tsx';
import MyMap from './Components/MyMap.tsx';
import CreateQuiz from './Components/CreateQuiz.tsx';
import MyQuizzes from './Components/MyQuizzes.tsx';

let router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LogIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/myquizzes",
        element: <MyQuizzes />
      },
      {
        path: "/createquiz",
        element: <CreateQuiz />
      },
      {
        path: "/quiz",
        element: <MainLayout />
      },
      {
        path: "/quiz/:region",
        element: <MyMap />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
