import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
import { router } from "./app.router";


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
