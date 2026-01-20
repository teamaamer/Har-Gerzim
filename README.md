# Loza Mount Gerizim | שיווק הר גריזים

A premium, production-ready headless Shopify storefront built with Next.js 16+, featuring trilingual support (Hebrew RTL, English, Arabic), dynamic collections, smooth page transitions, and a conversion-optimized UI/UX.

## 🚀 Features

### Core Features
- **Headless Shopify Integration**: Full Storefront API integration for products, collections, cart, and checkout
- **Trilingual Support**: Hebrew (RTL), English (LTR), and Arabic (RTL) with seamless language switching
- **Dynamic Collections**: Collections automatically fetched from Shopify with locale-aware translations
- **Smooth Animations**: Page transitions, language switcher animations, and micro-interactions with Framer Motion
- **Premium UI/UX**: Built with shadcn/ui, TailwindCSS, and modern design patterns
- **Cart Management**: Full cart page with drawer, quantity controls, and order summary
- **Customer Accounts**: Registration, login, profile management, and order history
- **Age Verification**: 18+ gate for alcohol products with compliance features

### Technical Features
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, multilingual sitemap, and robots.txt
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Legal Compliance**: Complete legal pages (Privacy, Terms, Returns, Shipping, Cookies, Accessibility)
- **Contact Form**: Email integration with Nodemailer
- **Responsive Design**: Mobile-first approach with premium desktop experience
- **Performance**: Optimized images, code splitting, and fast page loads

## 📋 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter (English), Heebo (Hebrew), System fonts (Arabic)
- **E-commerce**: Shopify Storefront API + Customer Account API
- **Email**: Nodemailer
- **State Management**: React Context API

## 🛠️ Prerequisites

- Node.js 18+ and npm
- A Shopify store with products
- Shopify Storefront API access token
- Email service credentials (for contact form)

## 📦 Installation

1. **Clone or navigate to the project directory**:
```bash
cd har-bracha-dev
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Shopify Storefront API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_API_VERSION=2024-01

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=info@lozamountgerizim.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔑 Shopify Setup

### 1. Create a Custom App

1. Go to your Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it (e.g., "Headless Storefront")
4. Go to **Configuration** → **Storefront API**
5. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`

6. Click **Install app**
7. Copy the **Storefront API access token** to your `.env.local`

### 2. Create Collections

Create collections in Shopify Admin with any handles you want. The site will automatically fetch and display them dynamically. For best results:
- Add collection images in Shopify
- Translate collection titles and descriptions for each language (Hebrew, English, Arabic)
- Collections will appear in the header navigation, footer, and featured collections section

**Note**: Collections are fetched dynamically from Shopify, so any changes in your Shopify admin will automatically reflect on the site.

### 3. Add Product Metafields

For enhanced product information, create custom metafields in Shopify Admin → **Settings** → **Custom data** → **Products**:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `custom` | `abv` | Number (decimal) | Alcohol by volume (%) |
| `custom` | `size_ml` | Number (integer) | Product size in ml |
| `custom` | `kosher` | Single line text | Kosher certification |
| `custom` | `ingredients` | Multi-line text | Product ingredients |
| `custom` | `allergens` | Multi-line text | Allergen information |
| `custom` | `storage` | Multi-line text | Storage instructions |
| `custom` | `shelf_life` | Single line text | Shelf life information |
| `custom` | `harvest_year` | Single line text | Harvest year (for olive oil) |
| `custom` | `acidity` | Single line text | Acidity level (for olive oil) |

### 4. Tag Alcohol Products

Add the tag `alcohol` or `arak` to any alcohol products to trigger 18+ badges and age verification requirements.

## 📧 Email Setup (Gmail Example)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in `EMAIL_PASS` in `.env.local`

## ✨ Recent Updates

### Dynamic Collections System
- Collections automatically fetched from Shopify
- Locale-aware translations (Hebrew, English, Arabic)
- No hardcoded collection handles needed
- Updates in Shopify reflect immediately on site

### Enhanced User Experience
- **Smooth Page Transitions**: Animated page changes when switching languages
- **Language Switcher Animations**: Dropdown menu with fade and slide effects
- **Path Preservation**: Language switcher maintains current page when switching
- **Cart Page**: Full-featured cart page with order summary and quantity controls
- **View Cart Button**: Easy access to cart page from cart drawer

### Improved Translations
- Complete cart page translations (Hebrew, English, Arabic)
- All UI elements properly localized
- Collection titles and descriptions from Shopify translations

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The app will redirect to `/he` (Hebrew) by default. You can access:
- Hebrew: `/he`
- English: `/en`
- Arabic: `/ar`

Language switching is available in the header with smooth animations and path preservation.

## 🏗️ Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
har-bracha-dev/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── (store)/           # Store pages (home, collections, products, cart)
│   │   ├── (legal)/           # Legal pages (about, terms, privacy, etc.)
│   │   └── layout.tsx         # Locale layout with fonts, providers, and page transitions
│   ├── api/                   # API routes (cart, contact, customer)
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root redirect
│   ├── sitemap.ts             # Dynamic sitemap with collections
│   ├── robots.ts              # Robots.txt
│   └── icon.png               # Favicon
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer with dynamic collections
│   ├── cart/                  # Cart provider, drawer, and full cart page
│   ├── home/                  # Homepage sections (hero, featured collections, etc.)
│   ├── products/              # Product components with variant selection
│   ├── decorative/            # Decorative elements (particles, gradients)
│   ├── age-gate/              # Age verification
│   ├── page-transition.tsx    # Smooth page transitions
│   ├── cookie-consent-banner.tsx  # Cookie consent
│   └── contact-form.tsx       # Contact form
├── contexts/
│   └── customer-context.tsx   # Customer authentication context
├── lib/
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts          # Locale configuration (he, en, ar)
│   │   ├── dictionaries/      # Translation files (he.json, en.json, ar.json)
│   │   └── get-dictionary.ts  # Dictionary loader
│   ├── shopify/               # Shopify integration
│   │   ├── client.ts          # API client
│   │   ├── queries.ts         # GraphQL queries (including getAllCollections)
│   │   ├── types.ts           # TypeScript types
│   │   └── index.ts           # Helper functions with locale support
│   └── utils.ts               # Utility functions
├── middleware.ts              # Locale routing middleware
├── tailwind.config.js         # TailwindCSS configuration
└── next.config.ts             # Next.js configuration
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION`
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to customize the navy/gold color scheme:

```js
colors: {
  navy: { /* ... */ },
  gold: { /* ... */ },
}
```

### Translations

Edit translation files in `lib/i18n/dictionaries/`:
- `he.json` - Hebrew translations
- `en.json` - English translations
- `ar.json` - Arabic translations

**Note**: Product collections are automatically translated from Shopify. Make sure to add translations for your collections in Shopify admin for each language.

### Collections

Collections are now **dynamically fetched** from Shopify and automatically appear in:
- Header navigation dropdown
- Footer links
- Featured collections section on homepage
- Sitemap

Simply create or update collections in Shopify admin, and they'll automatically appear on the site with proper translations.

## 🔒 Compliance Features

### Age Verification
- Modal gate on first visit (stored for 30 days)
- 18+ badge on alcohol products
- Checkbox confirmation before checkout
- Age-blocked page for underage users

### Legal Pages
All required legal pages are included:
- Privacy Policy
- Terms of Use
- Cookie Policy
- Shipping Policy
- Returns & Cancellations
- Accessibility Statement
- FAQ

### Cookie Consent
- Banner with accept/reject options
- Essential cookies always enabled
- Stored in localStorage

## 🐛 Troubleshooting

### Shopify API Errors
- Verify your Storefront API token is correct
- Check that required scopes are enabled
- Ensure products are published to the sales channel

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify Shopify cart API permissions

### Email Not Sending
- Verify SMTP credentials
- Check firewall/port settings
- For Gmail, ensure app password is used (not regular password)

### RTL/LTR Issues
- Ensure `dir` attribute is set correctly in HTML
- Check TailwindCSS RTL plugin configuration
- Verify font loading for Hebrew (Heebo)

## 📝 License

All rights reserved © 2024 Loza Mount Gerizim | שיווק הר גריזים

## 📞 Support

For questions or support:
- Phone: 052-2738783
- Location: Har Bracha - Gerizim - Israel

---

Built with ❤️ using Next.js, Shopify, and modern web technologies.
