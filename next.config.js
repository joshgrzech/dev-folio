const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.licdn.com'],
    },
}

module.exports = million.next(
  nextConfig
, { auto: { rsc: true } }
)