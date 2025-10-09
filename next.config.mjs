import path from "node:path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next/image": path.join(process.cwd(), "src/shims/NoImage.tsx"),
    };
    return config;
  },
};

export default nextConfig;
