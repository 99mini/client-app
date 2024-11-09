/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'plankton-hackathon-s3.s3.ap-northeast-2.amazonaws.com',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'plankton-hackathon-s3',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
