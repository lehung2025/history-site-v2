import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tối ưu kích thước ảnh cho các thiết bị phổ biến
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Tối ưu srcset để giảm băng thông
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Tắt tối ưu hóa ảnh trong dev để kiểm tra nhanh (tùy chọn)
    unoptimized: process.env.NODE_ENV === "development" ? true : false,
    // Config cho Firebase (dù chưa dùng, để sẵn nếu sau này fetch từ Firebase)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/next-js-history.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;
