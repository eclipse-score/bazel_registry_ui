/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/bazel_registry_ui'

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // for hosting under GitHub Pages
  basePath,
  assetPrefix: basePath,
  // Increase timeout for generating static pages from default 60s to avoid issues like:
  // Restarted static page generation for /modules/xxx/y.y.y because it took more than 60 seconds
  staticPageGenerationTimeout: 600,
}

module.exports = nextConfig
