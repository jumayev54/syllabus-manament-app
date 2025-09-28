/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/syllabus-manament-app" : "",
  assetPrefix: isProd ? "/syllabus-manament-app/" : "",
};

export default nextConfig;
