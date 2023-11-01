[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhsngdz%2Fnextjs-woocommerce&project-name=nextjs-woocommerce&repo-name=nextjs-woocommerce&demo-title=Next.js%20+%20WooCommerce&env=COMPANY_NAME,SITE_NAME,TWITTER_CREATOR,TWITTER_SITE)

# Next.js + WooCommerce

A Next.js 14 and App Router-ready ecommerce template featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Server Actions for mutations
- Edge Runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Checkout and payments with WooCommerce
- Automatic light/dark mode based on system settings

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your WooCommerce store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Vercel, Next.js Commerce, and WooCommerce Integration Guide

You can use this comprehensive [integration guide (Soon)](http://#) with step-by-step instructions on how to configure WooCommerce as a headless CMS using Next.js Commerce as your headless WooCommerce storefront on Vercel.
