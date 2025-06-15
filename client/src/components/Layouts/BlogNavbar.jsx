import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { blog_nav_data } from "../../utils/data";
import SideMenu from "./SideMenu";
import { AnimatePresence, motion } from "framer-motion";

const BlogNavbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openSearchbar, setOpenSearchbar] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white/60 backdrop-blur-xl w-full  font-dm-sans fixed top-0 left-0 z-50">
        <div className="mx-auto flex items-center justify-between w-full max-w-6xl h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {openSidebar ? (
                <HiOutlineX className="text-2xl text-gray-700" />
              ) : (
                <HiOutlineMenu className="text-2xl text-gray-700" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {blog_nav_data.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium ${
                  activeMenu === item.label ? "bg-blue-100 text-blue-700" : ""
                }`}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className=" flex items-center gap-4 ml-6">
            <button
              className=""
              onClick={() => setOpenSearchbar(!openSearchbar)}
            >
              <FaSearch className=" text-gray-400 text-lg" />
            </button>
            <Link to="/login">
              <button
                className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
                onClick={() => setOpenAuthForm(true)}
              >
                Login/signup
              </button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-xl text-gray-700"
              onClick={() => setSearchbar(!searchbar)}
              aria-label="Open search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </header>
      {openSearchbar && (
        <div className="fixed  bg-slate-100 px-4 py-8 rounded-full translate-x-[-50%] left-1/2 top-16 z-50 flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim())
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }}
            className="flex items-center gap-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all  text-gray-700 w-96"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => setOpenSearchbar(false)}
              className="text-xl text-gray-700 cursor-pointer hover:text-gray-900"
            >
              <HiOutlineX />
            </button>
          </form>
        </div>
      )}
      {openSidebar && (
        <AnimatePresence>
          <motion.div
            initial={{ x: -300, opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ x: -300, opacity: 0, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-15 left-2  h-full w-52 z-50 bg-white backdrop-blur-lg  md:hidden"
          >
            <SideMenu activeMenu={activeMenu} isBlogMenu />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="h-16" />
    </>
  );
};

export default BlogNavbar;
