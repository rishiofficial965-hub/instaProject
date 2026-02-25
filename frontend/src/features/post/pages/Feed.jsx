import React, { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";
import { Link } from "react-router-dom";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();
  
  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <i className="fa-brands fa-instagram text-4xl text-gray-400 animate-pulse mb-4"></i>
          <p className="text-gray-500 font-medium tracking-wide">Loading feed...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 flex flex-col items-center pb-20">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center cursor-pointer mt-1">
            <span 
              className="text-gray-900 text-[28px] font-medium tracking-wide"
              style={{ fontFamily: "'Grand Hotel', cursive" }}
            >
              InstaClone
            </span>
          </Link>
          <div className="flex gap-5 text-[22px] text-gray-800 mt-1">
            <i className="fa-regular fa-square-plus cursor-pointer hover:text-gray-500 transition"></i>
            <i className="fa-regular fa-heart cursor-pointer hover:text-gray-500 transition"></i>
            <i className="fa-brands fa-facebook-messenger cursor-pointer hover:text-gray-500 transition"></i>
          </div>
        </div>
      </header>

      <div className="w-full max-w-lg mx-auto pt-6 px-4 py-8">
        {feed.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-200 mt-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-camera text-3xl text-gray-800"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Yet</h2>
            <p className="text-gray-500">When people post photos, you'll see them here.</p>
          </div>
        ) : (
          feed.map((postItem) => (
            <Post key={postItem._id} user={postItem.user} post={postItem} />
          ))
        )}
      </div>
    </main>
  );
};

export default Feed;
