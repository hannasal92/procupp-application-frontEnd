/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "he"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "152.42.240.62.traefik.me",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
