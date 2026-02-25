import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/auth.context";
import { router } from "./app.router";
import { PostContextProvider } from "./features/post/post.context";

export default function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
}
