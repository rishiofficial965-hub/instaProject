import React,{useState} from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const SideBar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    function handleLogout() {
        Cookies.remove("token");
        navigate("/login");
    }

    const menuItems = [
        { icon: "fa-solid fa-house", label: "Home" },
        { icon: "fa-solid fa-magnifying-glass", label: "Search" },
        { icon: "fa-solid fa-compass", label: "Explore" },
        { icon: "fa-solid fa-clapperboard", label: "Reels" },
        { icon: "fa-solid fa-message", label: "Messages" },
        { icon: "fa-solid fa-heart", label: "Notifications" },
        { icon: "fa-solid fa-square-plus", label: "Create" },
        { icon: "fa-solid fa-user", label: "Profile" },
    ];

    return (
        <aside
            className={`h-screen fixed left-0 top-16 z-40 flex flex-col transition-all duration-300 ease-in-out 
            ${toggle ? "w-64" : "w-20"} 
            bg-white/30 backdrop-blur-2xl text-black shadow-[0_8px_32px_rgba(31,38,135,0.37)] overflow-hidden`}
        >
            {}
            <div className="flex justify-end p-4">
                <button
                    onClick={() => setToggle(!toggle)}
                    className="p-2 rounded-xl hover:bg-black/10 transition-colors duration-200 text-black/60 hover:text-black"
                >
                    <i className={`ri-menu-line text-xl transition-transform duration-300 ${toggle ? "rotate-180" : ""}`}></i>
                </button>
            </div>

            {}
            <nav className="flex-1 px-3 space-y-2 mt-4">
                {menuItems.map((item, index) => (
                    <div
                        onClick={()=>{
                            if(item.label == 'Create') {
                                navigate('/addPost')
                            } else if(item.label == 'Profile') {
                                navigate('/profile')
                            } else {
                                navigate('/home')
                            }
                        }}
                        key={index}
                        className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-black/10 hover:bg-black/5 active:scale-95"
                    >
                        <div className="w-8 flex justify-center">
                            <i className={`${item.icon} text-xl text-black/70 group-hover:text-black group-hover:scale-110 transition-transform duration-200`}></i>
                        </div>
                        <span
                            
                            className={`font-medium whitespace-nowrap transition-all duration-300 ${
                                toggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                            }`}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </nav>

            {}
            <div className="p-3 mb-20">
                <div
                    onClick={handleLogout}
                    className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-black/10 hover:bg-red-500/10 hover:border-red-500/20 active:scale-95"
                >
                    <div className="w-8 flex justify-center text-black/70 group-hover:text-red-600">
                        <i className="fa-solid fa-right-from-bracket text-xl group-hover:translate-x-1 transition-transform duration-200"></i>
                    </div>
                    <span
                        className={`font-medium whitespace-nowrap transition-all duration-300 ${
                            toggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                        }`}
                    >
                        Logout
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
