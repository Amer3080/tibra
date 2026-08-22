// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,

//   // Redirect bare root to default locale
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/en",
//         permanent: false,
//       },
//       // Keep old /shop route working
//       {
//         source: "/:locale/shop",
//         destination: "/:locale/product",
//         permanent: true,
//       },
//       {
//         source: "/:locale/shop-details",
//         destination: "/:locale/products/0",
//         permanent: true,
//       },
//     ];
//   },

//   async headers() {
//     return [
//       {
//         source: "/assets/:path*",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default withNextIntl(nextConfig);

// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,

//   turbopack: {
//     root: import.meta.dirname, // يثبّت جذر المشروع = مجلد tibra-main نفسه
//   },

//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/en",
//         permanent: false,
//       },
//       // Keep old /shop route working
//       {
//         source: "/:locale/shop",
//         destination: "/:locale/product",
//         permanent: true,
//       },
//       {
//         source: "/:locale/shop-details",
//         destination: "/:locale/products/0",
//         permanent: true,
//       },
//     ];
//   },

//   async headers() {
//     return [
//       {
//         source: "/assets/:path*",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default withNextIntl(nextConfig);


import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  turbopack: {
    root: import.meta.dirname,
  },

  // Redirect bare root to default locale
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      // Keep old /shop route working
      {
        source: "/:locale/shop",
        destination: "/:locale/product",
        permanent: true,
      },
      {
        source: "/:locale/shop-details",
        destination: "/:locale/products/0",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);