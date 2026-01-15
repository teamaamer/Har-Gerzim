# Loza Mount Gerizim | שיווק הר גריזים

A premium, production-ready headless Shopify storefront built with Next.js 14+, featuring bilingual support (Hebrew RTL + English LTR), age verification, and a conversion-optimized UI/UX.

## 🚀 Features

- **Headless Shopify Integration**: Full Storefront API integration for products, collections, cart, and checkout
- **Bilingual Support**: Hebrew (RTL) and English (LTR) with seamless language switching
- **Premium UI/UX**: Built with shadcn/ui, TailwindCSS, and Framer Motion for smooth animations
- **Age Verification**: 18+ gate for alcohol products with compliance features
- **SEO Optimized**: Metadata, JSON-LD structured data, sitemap, and robots.txt
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Legal Compliance**: Complete legal pages (Privacy, Terms, Returns, Shipping, Cookies, Accessibility)
- **Contact Form**: Email integration with Nodemailer
- **Cart Management**: Persistent cart with Shopify checkout integration
- **Responsive Design**: Mobile-first approach with premium desktop experience

## 📋 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter (English), Heebo (Hebrew)
- **E-commerce**: Shopify Storefront API
- **Email**: Nodemailer

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

Create the following collections in Shopify Admin:
- **Arak** (handle: `arak`)
- **Tahini** (handle: `tahini`)
- **Hummus** (handle: `hummus`)
- **Olive Oil** (handle: `olive-oil`)

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

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The app will redirect to `/he` (Hebrew) by default. You can access English at `/en`.

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
│   │   ├── (store)/           # Store pages (home, collections, products)
│   │   ├── (legal)/           # Legal pages (about, terms, privacy, etc.)
│   │   └── layout.tsx         # Locale layout with fonts and providers
│   ├── api/                   # API routes (cart, contact)
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root redirect
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer
│   ├── cart/                  # Cart provider and drawer
│   ├── age-gate/              # Age verification
│   ├── products/              # Product components
│   └── contact-form.tsx       # Contact form
├── lib/
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts          # Locale configuration
│   │   ├── dictionaries/      # Translation files (he.json, en.json)
│   │   └── get-dictionary.ts  # Dictionary loader
│   ├── shopify/               # Shopify integration
│   │   ├── client.ts          # API client
│   │   ├── queries.ts         # GraphQL queries
│   │   ├── types.ts           # TypeScript types
│   │   └── index.ts           # Helper functions
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

### Collections

Update collection handles in:
- `app/[locale]/(store)/page.tsx` (home page)
- `components/layout/header.tsx` (navigation)
- `components/layout/footer.tsx` (footer links)

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
