import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegistrationForm from "./features/auth/pages/RegistrationForm";
import { AuthProvider } from "./features/auth/auth.context";

const router = createBrowserRouter([
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

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
