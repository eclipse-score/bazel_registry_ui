/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // 👇 Required for GitHub Pages under /bcr-ui
  basePath: '/bazel_registry_ui',
  assetPrefix: '/bazel_registry_ui',
  staticPageGenerationTimeout: 600,
}

module.exports = nextConfig
