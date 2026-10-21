/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};
