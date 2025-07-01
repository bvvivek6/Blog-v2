export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/image/upload-image", // Fixed typo here
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/dashboard",
  },
  AI: {
    GENERATE_BLOG_POST: "/api/ai/generate",
    GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas",
    GENERATE_REPLY: "/api/ai/generate-reply",
    GENERATE_BLOG_SUMMARY: "/api/ai/generate-summary",
  },
  POSTS: {
    CREATE: "/api/posts",
    GET_ALL: "/api/posts",
    GET_BY_ID: (id) => `/api/posts/${id}`,
    GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`,
    UPDATE: (id) => `/api/posts/${id}`,
    DELETE: (id) => `/api/posts/${id}`,
    GET_BY_TAG: (tag) => `/api/posts/tag/${tag}`,
    SEARCH: "/api/posts/search",
    INCREMENT_VIEWS: (id) => `/api/posts/${id}/views`,
    LIKE: (id) => `/api/posts/${id}/like`,
  },

  COMMENTS: {
    ADD: (postId) => `/api/comments/${postId}`,
    GET_BY_POST: (postId) => `/api/comments/${postId}`,
    DELETE: (commentId) => `/api/comments/${commentId}`,
    GET_ALL: "/api/comments",
  },
};
