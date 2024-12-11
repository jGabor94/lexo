/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: !process.env.VERCEL_ENV ? 'http://localhost:3000' : process.env.VERCEL_ENV === "production" ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : `https://${process.env.VERCEL_URL}`,
        AUTH_URL: !process.env.VERCEL_ENV ? 'http://localhost:3000/api/auth' : process.env.VERCEL_ENV === "production" ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/auth` : `https://${process.env.VERCEL_URL}/api/auth`
    },
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 180,
        },
    },
};

export default nextConfig;
