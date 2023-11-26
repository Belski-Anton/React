/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ws-public.interpol.int",
      },
    ],
  },
};

module.exports = nextConfig

