/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/images/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}/:path*`,
      },
      {
        source: "/api/documents/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}documents/:path*`,
      },
      {
        source: "/api/banners/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}banners/:path*`,
      },
      {
        source: "/api/campaigns/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}campaigns/:path*`,
      },
      {
        source: "/media/blog_description_images/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}blog_description_images/:path*`,
      },
      {
        source: "/api/media-library/:path*",
        destination: `${process.env.NEXT_PUBLIC_IMAGE_URL}media-library/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
    ],
  },
  env: {
    API_URL: process.env.DJANGO_BACKEND_BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    IMAGE_API_URL: process.env.DJANGO_BACKEND_IMAGE_URL,
    ESEWA_API_URL: process.env.ESEWA_TEST_BASE_URL,
  },
  compiler: {
    removeConsole: !process.env.NODE_ENV === "development",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")();

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
