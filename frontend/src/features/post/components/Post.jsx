import { useState, useContext } from "react";
import { usePost } from "../hook/usePost";
import { AuthContext } from "../../auth/context/AuthContext";

const Post = ({ user: postOwner, post }) => {
  const { handleDeletePost, handleToggleLike } = usePost();
  const { user: currentUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  // Robust ownership check
  const currentId = currentUser?._id || currentUser?.id;
  const ownerId = postOwner?._id || postOwner;
  
  const isOwner = (currentId && (ownerId === currentId)) || 
                (currentUser?.username && postOwner?.username === currentUser.username);


  return (
    <>
    
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <div className="cursor-pointer rounded-full bg-white p-[2px]">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={postOwner?.profileImage || `https://ui-avatars.com/api/?name=${postOwner?.username || 'User'}&background=random`}
                alt="profile"
                onError={(e) => {
                  e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
                }}
              />
            </div>
          </div>
          <p className="cursor-pointer font-semibold text-gray-800 text-sm">
            {postOwner?.username || "Unknown User"}
          </p>
          <div className="relative ml-auto">
            <i 
              className="fa-solid fa-ellipsis text-gray-500 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            ></i>
            
            {showMenu && isOwner && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-1 animate-in fade-in zoom-in duration-150">
                <button 
                  onClick={() => {
                    console.log("Delete clicked for post:", post._id);
                    if (window.confirm("Are you sure you want to delete this?")) {
                      console.log("Confirmation accepted, calling handleDeletePost...");
                      handleDeletePost(post._id).then(success => {
                        console.log("Delete result:", success);
                        if (!success) alert("Failed to delete post. Check console for details.");
                      });
                    }
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <i className="fa-regular fa-trash-can"></i>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <img
          src={post.imgUrl}
          alt="post"
          className="w-full max-h-[600px] object-cover"
        />
        <div className="flex justify-between px-5 py-1 text-black">
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={() => handleToggleLike(post._id)}>
              <i 
                className={`text-2xl ${post.isLiked ? 'ri-heart-fill text-red-500 hover:text-red-600' : 'ri-heart-line hover:text-gray-500'} transition-colors duration-200`}
              ></i>
            </div>
            <div className="cursor-pointer">
              <i className="text-2xl ri-chat-1-line hover:text-gray-500 transition-colors"></i>
            </div>
            <div className="cursor-pointer">
              <i className="text-2xl ri-share-forward-line hover:text-gray-500 transition-colors"></i>
            </div>
          </div>
          <div>
            <i className="cursor-pointer text-2xl ri-bookmark-line hover:text-gray-500 transition-colors"></i>
          </div>
        </div>

        <div className="px-6 py-1">
          <p className="font-semibold text-sm text-gray-800">
            {post.likeCount || 0} likes
          </p>
        </div>

        <div className="px-6 py-2 pb-4">
          <p className="font-semibold text-gray-800">
            {postOwner?.username || "Unknown User"}
          </p>
          <p className="text-gray-700 leading-relaxed mt-1">
            {post?.caption}
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
