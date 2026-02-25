import { useContext } from "react";
import { getfeed, likePost } from "../services/post.api";
import { PostContext } from "../postContext";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, feed, setFeed } = context;

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
      
      // Update feed locally rather than refreshing the whole feed
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

  return { loading, feed, post, handleGetFeed, handleToggleLike };
};
