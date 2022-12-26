// // next.config.js
// module.exports = {
//   compiler: {
//     emotion: true,
//   },
//   images: {
//     domains: ["apod.nasa.gov"],
//   },
// };

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["apod.nasa.gov"],
  },
};
 
export default nextConfig;
 