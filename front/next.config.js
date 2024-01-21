/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/api/auth/signin', // `next-auth` のデフォルトのサインインURL
      },
      {
        source: '/logout',
        destination: '/api/auth/signout',
      },
      {
        source: '/login-session',
        destination: '/api/auth/session',
      },
      // 他のリライトルールがあればここに追加します
    ];
  },
};

module.exports = nextConfig;
