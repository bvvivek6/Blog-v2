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
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/:id" element={<BlogView />} />
          <Route path="/tag/:tagName" element={<PostByTags />} />
          <Route path="/search" element={<SearchPosts />} />

          {/*Admin Private Routes*/}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route path="/admin/create" element={<BlogPostEditor />} />
            <Route
              path="/admin/edit/:id"
              element={<BlogPostEditor isEdit={true} />}
            />
          </Route>

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
