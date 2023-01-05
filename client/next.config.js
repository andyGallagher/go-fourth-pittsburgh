/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["cdn.gofourthpittsburgh.org", "cdn.sanity.io"],
        unoptimized: true,
    },
};

module.exports = nextConfig;
