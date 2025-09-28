/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",           // <-- changed
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/syllabus-manament-app" : "",
  assetPrefix: isProd ? "/syllabus-manament-app/" : "",
};

export default nextConfig;
