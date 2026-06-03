/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Untuk GitHub Pages (static export)
  images: {
    unoptimized: true, // Karena export static, gambar tidak bisa dioptimasi dengan next/image
  },
  trailingSlash: true,
};

module.exports = nextConfig;
