import { withBotId } from 'botid/next/config'


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// الدمج الصحيح بين الإضافتين
export default withBotId(nextConfig)
