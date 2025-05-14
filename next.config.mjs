/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-auth'],
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
          // {
          //   protocol: "https",
          //   hostname: "akirafastapi-oranmarcos8221-0icao7kd.leapcell.dev",
          //   port: "",
          //   pathname: "**",
          // },
          // {
          //   protocol: "https",
          //   hostname: "nz9lxjqh-5000.usw3.devtunnels.ms",
          //   port: "",
          //   pathname: "**",
          // },
          {
            protocol: "https",
            hostname: "flowbite.s3.amazonaws.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "www.animenewsnetwork.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "akira-mini-app.dedyn.io",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "s4.anilist.co",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "i.ytimg.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "i.ibb.co",
            port: "",
            pathname: "**",
          },
          // {
          //   protocol: "http",
          //   hostname: "localhost",
          //   port: "3000",
          //   pathname: "**",
          // },
          // {
          //   protocol: "http",
          //   hostname: "localhost",
          //   port: "5000",
          //   pathname: "**",
          // },
        ],
      },
};


export default nextConfig;