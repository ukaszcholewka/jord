/** @type {import('next').NextConfig} */


const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
const HOST = process.env.NEXT_PUBLIC_HOST
const PORT = process.env.NEXT_PUBLIC_PORT

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '*'
      },
      {
        protocol: PROTOCOL,
        hostname: HOST,
        port: PORT,
        pathname: '**'
      },
    ]
  }
};

export default nextConfig;
