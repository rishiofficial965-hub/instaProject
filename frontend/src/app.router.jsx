import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegistrationForm from "./features/auth/pages/RegistrationForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-3xl">welcome!!</h1>,
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
