import { useContext } from "react";
import { getfeed, likePost, createPost, getUserPosts } from "../services/post.api";
import { PostContext } from "../postContext";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, feed, setFeed, userPosts, setUserPosts } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getfeed();
      setFeed(data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      
      setFeed((prevFeed) =>
        prevFeed.map((p) => {
          if (p._id === postId) {
            const increment = response.isLiked ? 1 : -1;
            return {
              ...p,
              isLiked: response.isLiked,
              likeCount: (p.likeCount || 0) + increment,
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", context.imageFile);
      formData.append("caption", context.caption);

      await createPost(formData);
      
      
      context.setImagePreview(null);
      context.setImageFile(null);
      context.setCaption("");
      
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserPosts = async () => {
    try {
      setLoading(true);
      const data = await getUserPosts();
      setUserPosts(data.post);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return { 
    loading, 
    feed, 
    post, 
    userPosts,
    handleGetFeed, 
    handleToggleLike, 
    handleCreatePost,
    handleGetUserPosts
  };
};
