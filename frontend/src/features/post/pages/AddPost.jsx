import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { PostContext } from "../postContext";
import { usePost } from "../hook/usePost";

const AddPost = () => {
    const navigate = useNavigate();
    const { handleCreatePost, loading: submitting } = usePost();
    const {
        imagePreview,
        setImagePreview,
        caption,
        setCaption,
        imageFile,
        setImageFile,
    } = useContext(PostContext);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const onShare = async () => {
        if (!imageFile) return;
        const success = await handleCreatePost();
        if (success) {
            navigate("/home");
        }
    };

    return (
        <main className="relative min-h-screen w-full bg-gray-50 flex flex-col items-center pb-20">
            <SideBar />
            
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
                    <button 
                        onClick={() => navigate("/home")}
                        className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">New Post</h1>
                    <button 
                        className="text-blue-500 font-semibold hover:text-blue-600 transition-colors disabled:opacity-50"
                        disabled={!imageFile || submitting}
                        onClick={onShare}
                    >
                        {submitting ? "Sharing..." : "Share"}
                    </button>
                </div>
            </header>

            <div className="w-full max-w-lg mx-auto pt-6 px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Media Upload Area */}
                    <div 
                        onClick={!imagePreview ? triggerFileInput : undefined}
                        className={`relative aspect-square w-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                            !imagePreview ? "bg-gray-50 hover:bg-gray-100/80" : "bg-black"
                        }`}
                    >
                        {imagePreview ? (
                            <>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-contain"
                                />
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImagePreview(null);
                                        setImageFile(null);
                                    }}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/70 transition-all"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-gray-400 group">
                                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center group-hover:border-gray-400 group-hover:scale-105 transition-all">
                                    <i className="fa-solid fa-camera text-3xl"></i>
                                </div>
                                <p className="font-medium group-hover:text-gray-500 transition-colors">Select from computer</p>
                            </div>
                        )}
                        <input 
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Form Section */}
                    <div className="p-4 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <i className="fa-solid fa-user text-gray-300 text-lg"></i>
                                </div>
                            </div>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write a caption..."
                                className="flex-1 w-full p-2 h-24 resize-none border-none focus:ring-0 text-sm md:text-base placeholder-gray-400 text-black"
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-gray-400">
                           <span className="text-xs">Caption character limit: {caption.length}/2200</span>
                           <div className="flex gap-4">
                               <i className="fa-regular fa-face-smile cursor-pointer hover:text-gray-600"></i>
                               <i className="fa-solid fa-location-dot cursor-pointer hover:text-gray-600"></i>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AddPost;
