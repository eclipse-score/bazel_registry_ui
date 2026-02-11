/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Required for GitHub Pages under /bazel_registry_ui
  basePath: '/bazel_registry_ui',
  assetPrefix: '/bazel_registry_ui',
  // Increase timeout for generating static pages from default 60s to avoid issues like:
  // Restarted static page generation for /modules/xxx/y.y.y because it took more than 60 seconds
  staticPageGenerationTimeout: 600,
}

module.exports = nextConfig
