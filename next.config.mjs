/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "t4.ftcdn.net",
            port: "",
            pathname: "/jpg/**",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "akirafastapi-oranmarcos8221-0icao7kd.leapcell.dev",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "nz9lxjqh-5000.usw3.devtunnels.ms",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "flowbite.s3.amazonaws.com",
            port: "",
            pathname: "**",
          },
        ],
      },
};

export default nextConfig;