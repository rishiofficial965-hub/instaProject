import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegistrationForm from "./features/auth/pages/RegistrationForm";
import Feed from "./features/post/pages/Feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed/>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);
