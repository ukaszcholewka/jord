/** @type {import('next').NextConfig} */


const HOST = process.env.NEXT_PUBLIC_HOST
const PORT = process.env.NEXT_PUBLIC_PORT

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/photos/**'
      },
      {
        protocol: 'http',
        hostname: HOST,
        port: PORT,
        pathname: '/photos/**'
      },
    ]
  }
};

export default nextConfig;
