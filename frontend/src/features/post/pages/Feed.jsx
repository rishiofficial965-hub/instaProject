import React, { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";
const Feed = () => {
  const { feed, handleGetFeed ,loading} = usePost();
  useEffect(() => {
    handleGetFeed();
  }, []);
  if(loading || !feed) return <main><h1>loading.....</h1></main> 
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col justify-center py-10">
      <div className="w-full max-w-lg mx-auto">
        {feed?.map((postItem) => (
          <Post key={postItem._id} user={postItem.user} post={postItem} />
        ))}
      </div>
    </main>
  );
};

export default Feed;
