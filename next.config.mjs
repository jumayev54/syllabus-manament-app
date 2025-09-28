/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true, // Critical for GitHub Pages
  images: {
    unoptimized: true,
  },
  // Use your actual repository name
  basePath:
    process.env.NODE_ENV === "production" ? "/syllabus-manament-app" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/syllabus-manament-app/" : "",
};

export default nextConfig;
