import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { usePost } from "../hook/usePost";
import SideBar from "../components/SideBar";

const Profile = () => {
    const { user, handleGetMe } = useContext(AuthContext);
    const { userPosts, handleGetUserPosts, loading } = usePost();

    useEffect(() => {
        handleGetMe();
        handleGetUserPosts();
    }, []);

    const stats = [
        { label: "posts", count: user?.stats?.postCount || 0 },
        { label: "followers", count: user?.stats?.followersCount || 0 },
        { label: "following", count: user?.stats?.followingCount || 0 },
    ];

    return (
        <main className="relative min-h-screen w-full bg-gray-50 flex flex-col items-center pb-20">
            <SideBar />
            
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 ml-20 lg:ml-0">{user?.username || "Profile"}</h1>
                    <div className="flex gap-4">
                        <i className="fa-solid fa-gear text-xl text-gray-700 cursor-pointer"></i>
                    </div>
                </div>
            </header>

            <div className="w-full max-w-4xl mx-auto pt-8 px-4">
                {/* Profile Info */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-12">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px]">
                            <div className="w-full h-full rounded-full bg-white p-1">
                                <img 
                                    src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random&size=150`}
                                    alt="profile"
                                    className="w-full h-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <h2 className="text-2xl font-light">{user?.username || "username"}</h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-semibold transition-colors">
                                    Edit Profile
                                </button>
                                <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-semibold transition-colors">
                                    View Archive
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start gap-8 md:gap-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:gap-1 items-center">
                                    <span className="font-bold text-gray-900">{stat.count}</span>
                                    <span className="text-gray-600 md:text-gray-900 ml-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="max-w-md">
                            <p className="font-semibold text-sm">{user?.username}</p>
                            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                                {user?.bio || "No bio yet."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-200">
                    <div className="flex justify-center gap-12 -mt-[1px]">
                        <div className="flex items-center gap-2 py-4 border-t border-black cursor-pointer">
                            <i className="fa-solid fa-table-cells text-xs"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-black">Posts</span>
                        </div>
                        <div className="flex items-center gap-2 py-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                            <i className="fa-regular fa-bookmark text-xs"></i>
                            <span className="text-xs font-bold uppercase tracking-widest">Saved</span>
                        </div>
                        <div className="flex items-center gap-2 py-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                            <i className="fa-solid fa-user-tag text-xs"></i>
                            <span className="text-xs font-bold uppercase tracking-widest">Tagged</span>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-300"></i>
                    </div>
                ) : userPosts?.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1 md:gap-8 mt-4">
                        {userPosts.map((post) => (
                            <div key={post._id} className="aspect-square bg-gray-200 rounded-sm md:rounded-lg overflow-hidden group relative cursor-pointer">
                                <img 
                                    src={post.imgUrl} 
                                    alt={post.caption} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-heart"></i>
                                        <span>{post.likeCount || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-comment"></i>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center mb-4">
                            <i className="fa-solid fa-camera text-2xl"></i>
                        </div>
                        <p className="text-lg font-semibold">No Posts Yet</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Profile;
