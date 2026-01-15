import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Validate required environment variables
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || storeDomain === 'your-store.myshopify.com') {
  console.warn('⚠️  SHOPIFY_STORE_DOMAIN is not configured. Please update .env.local with your Shopify store domain.');
}

if (!accessToken || accessToken === 'your_storefront_access_token') {
  console.warn('⚠️  SHOPIFY_STOREFRONT_ACCESS_TOKEN is not configured. Please update .env.local with your Shopify Storefront API token.');
}

const client = createStorefrontApiClient({
  storeDomain: storeDomain || 'demo-store.myshopify.com',
  apiVersion: process.env.SHOPIFY_API_VERSION || '2024-01',
  publicAccessToken: accessToken || 'demo-token',
});

export default client;
