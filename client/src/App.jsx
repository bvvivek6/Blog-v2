import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogLandingPage from "./Pages/Blog/Components/BlogLandingPage";
import BlogView from "./Pages/Blog/Components/BlogView";
import PostByTags from "./Pages/Blog/Components/PostByTags";
import SearchPosts from "./Pages/Blog/Components/SearchPosts";
import AdminLogin from "./Pages/Admin/Components/AdminLogin";
import AdminDashboard from "./Pages/Admin/Components/AdminDashboard";
import BlogPosts from "./Pages/Admin/Components/BlogPosts";
import BlogPostEditor from "./Pages/Admin/Components/BlogPostEditor";
import PrivateRoutes from "./routes/PrivateRoutes";
import Comments from "./Pages/Admin/Components/Comments";
import UserProvider from "./Context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<BlogLandingPage />} />
            <Route path="/:id" element={<BlogView />} />
            <Route path="/tag/:tagName" element={<PostByTags />} />
            <Route path="/search" element={<SearchPosts />} />

            {/*Admin Private Routes*/}
            <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/posts" element={<BlogPosts />} />
              <Route path="/admin/create" element={<BlogPostEditor />} />
              <Route
                path="/admin/edit/:id"
                element={<BlogPostEditor isEdit={true} />}
              />
              <Route path="/admin/comments" element={<Comments />} />
            </Route>

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
