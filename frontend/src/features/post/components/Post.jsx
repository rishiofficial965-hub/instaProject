import { usePost } from "../hook/usePost";

const Post = ({ user, post }) => {
  const { handleToggleLike } = usePost();

  return (
    <>
      {/* Single Post */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {/* User Row */}
        <div className="flex items-center gap-3 px-4 pt-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <div
              className="cursor-pointer rounded-full bg-white 
              p-[2px]"
            >
              <img
                className="w-10 h-10 rounded-full object-cover "
                src={user?.profileImage || "https://via.placeholder.com/150"}
                alt="profile"
              />
            </div>
          </div>
          <p className="cursor-pointer font-semibold text-gray-800">
            {user?.username || "Unknown User"}
          </p>
        </div>

        {/* Post Image */}
        <img
          src={post.imgUrl}
          alt="post"
          className="w-full py-2 max-h-[550px] object-cover"
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

        {/* Like Count */}
        <div className="px-6 py-1">
          <p className="font-semibold text-sm text-gray-800">
            {post.likeCount || 0} likes
          </p>
        </div>

        {/* Bottom caption */}
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
