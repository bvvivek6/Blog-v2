import React from "react";
import BlogNavbar from "./BlogNavbar";

const BlogLayout = ({ children, activeMenu }) => {
  return (
    <div className="relative pb-20 overflow-hidden">
      <BlogNavbar activeMenu={activeMenu} />
      <div className="mx-auto px-5 md:px-0 mt-10">{children}</div>
    </div>
  );
};

export default BlogLayout;
