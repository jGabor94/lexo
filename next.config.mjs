/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: !process.env.VERCEL_ENV ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`,
        AUTH_URL: !process.env.VERCEL_ENV ? 'http://localhost:3000/api/auth' : `https://${process.env.VERCEL_URL}/api/auth`
    },
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 180,
        },
    },
};

export default nextConfig;
