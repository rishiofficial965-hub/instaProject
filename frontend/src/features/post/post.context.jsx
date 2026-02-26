import { useState } from "react";
import { PostContext } from "./postContext";

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState([]); 
  
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        loading,
        setLoading,
        post,
        setPost,
        feed,
        setFeed,
        userPosts,
        setUserPosts,
        imagePreview,
        setImagePreview,
        caption,
        setCaption,
        imageFile,
        setImageFile,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
