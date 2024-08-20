/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
                pathname: '/images',
                protocol: 'https',
                port: '443'

            }
        ],
        domains: ['utfs.io']
    }
};

export default nextConfig;
