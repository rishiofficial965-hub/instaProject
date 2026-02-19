import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegistrationForm from "./features/auth/pages/RegistrationForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

