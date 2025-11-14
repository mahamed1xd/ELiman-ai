import { withBotId } from 'botid/next/config';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const config = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

// ✨ الدمج النهائي
export default withBotId(pwaConfig(config));
