import { usePost } from "../hook/usePost";

const Post = ({ user, post }) => {
  const { handleToggleLike } = usePost();

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <div className="cursor-pointer rounded-full bg-white p-[2px]">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                alt="profile"
                onError={(e) => {
                  e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
                }}
              />
            </div>
          </div>
          <p className="cursor-pointer font-semibold text-gray-800 text-sm">
            {user?.username || "Unknown User"}
          </p>
          <i className="fa-solid fa-ellipsis ml-auto text-gray-500 cursor-pointer"></i>
        </div>

        <img
          src={post.imgUrl}
          alt="post"
          className="w-full max-h-[600px] object-cover"
        />
        <div className="flex justify-between px-5 py-1 text-black">
          <div className="flex gap-4">
            <div onClick={() => handleToggleLike(post._id)}>
              <i 
                className={`cursor-pointer text-2xl ${post.isLiked ? 'ri-heart-fill text-red-500 hover:text-red-600' : 'ri-heart-line hover:text-gray-500'} transition-colors duration-200`}
              ></i>
            </div>
            <div>
              <i className="cursor-pointer text-2xl ri-chat-1-line hover:text-gray-500 transition-colors"></i>
            </div>
            <div>
              <i className="cursor-pointer text-2xl ri-share-forward-line hover:text-gray-500 transition-colors"></i>
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
            {user?.username || "Unknown User"}
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
