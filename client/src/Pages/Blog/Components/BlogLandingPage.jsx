import React from "react";
import BlogLayout from "../../../components/Layouts/BlogLayout";

const BlogLandingPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, #BDC0C230 39px, #BDC0C230 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, #BDC0C230 39px, #BDC0C230 40px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="relative z-20 w-full min-h-screen flex">
        <BlogLayout>
          <div className="min-h-full flex items-center justify-center overflow-hidden">
            <div className="w-full">BlogLandingPage</div>
          </div>
        </BlogLayout>
      </div>
    </div>
  );
};

export default BlogLandingPage;
