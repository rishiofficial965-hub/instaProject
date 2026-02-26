import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegistrationForm from "./features/auth/pages/RegistrationForm";
import Feed from "./features/post/pages/Feed";
import AddPost from "./features/post/pages/AddPost";
import Profile from "./features/post/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Feed/>,
  },
  {
    path:"/login",
    element: <LoginForm />,
  },
  {
    path:"/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path: "/addPost",
    element: <AddPost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
