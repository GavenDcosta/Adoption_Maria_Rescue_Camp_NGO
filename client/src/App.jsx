import HomePage from "./routes/homePage/HomePage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage"
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Login from "./routes/loginPage/LoginPage"
import Register from "./routes/registerPage/register"
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage"
import { listPageLoader, singlePageLoader, profilePageLoader } from "./lib/loaders";
import AboutPage from "./routes/aboutPage/AboutPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
          element: <HomePage />,
        },
        {
          path:"/about",
          element: <AboutPage />,
        },
        {
          path:"/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path:"/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children: [
        {
          path:"/profile",
          element: <ProfilePage />,
          loader : profilePageLoader
        },
        {
          path:"/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path:"/add",
          element: <NewPostPage />,
        },
      ]
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App