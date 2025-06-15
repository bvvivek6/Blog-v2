import React from "react";
import { blog_nav_data, side_menu_data } from "../../utils/data";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu, isBlogMenu }) => {
  const user = "Vivek";
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "/admin-logout") {
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-[90vh] border rounded-xl font-dm-sans backdrop-blur-xl px-6 py-8 flex flex-col gap-8">
      {user && (
        <div className="flex flex-col items-center mb-6">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-3  object-cover "
            />
          ) : (
            <CharAvatar
              name={user?.name || "User"}
              width={80}
              height={80}
              style={{
                fontSize: "2rem",
              }}
            />
          )}
          <h2 className="text-2xl font-medium mb-1 text-black drop-shadow">
            {user || ""}
          </h2>
          <p className="text-sm text-blue-200">{user.email || ""}</p>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        {(isBlogMenu ? blog_nav_data : side_menu_data).map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-4 w-full rounded-full px-6 py-3 text-black  hover:bg-blue-800/40 backdrop-blur-sm ${
              activeMenu === item.label
                ? "bg-blue-700/80 text-white shadow-sm"
                : ""
            }`}
          >
            <span className="text-2xl flex items-center justify-center">
              {React.createElement(item.icon)}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      {user && (
        <button
          onClick={() => handleClick("/admin-logout")}
          className="flex items-center gap-3 w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white hover:from-red-600 hover:to-pink-600 transition-all font-semibold text-base shadow-lg mt-6 focus:outline-none focus:ring-2 focus:ring-red-400/40"
        >
          <LuLogOut className="text-2xl" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};

export default SideMenu;
