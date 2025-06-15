import {
  LuGalleryHorizontal,
  LuGalleryHorizontalEnd,
  LuLayoutDashboard,
  LuLayoutTemplate,
  LuMessageSquareQuote,
  LuTag,
} from "react-icons/lu";

export const side_menu_data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Posts",
    path: "/admin/posts",
    icon: LuGalleryHorizontalEnd,
  },
  {
    label: "Comments",
    path: "/admin/comments",
    icon: LuMessageSquareQuote,
  },
];

export const blog_nav_data = [
  {
    label: "Home",
    path: "/",
    icon: LuLayoutTemplate,
  },
  {
    label: "React",
    path: "/tag/react",
    icon: LuTag,
  },
  {
    label: "Next.js",
    path: "/tag/next.js",
    icon: LuTag,
  },
];
