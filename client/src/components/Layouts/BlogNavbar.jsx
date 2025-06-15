import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const BlogNavbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  return <></>;
};

export default BlogNavbar;
