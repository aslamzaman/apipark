/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('https://m.media-amazon.com/images/**'),
            new URL('http://localhost:3000/**'),
        ],
    },

};

export default nextConfig;
