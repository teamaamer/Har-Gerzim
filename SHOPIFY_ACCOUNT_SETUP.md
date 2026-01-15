# Shopify Customer Account API Configuration Guide

## ⚠️ IMPORTANT: Required Configuration

To enable customer accounts on your site, you **MUST** configure the following settings in your Shopify admin.

---

## 📋 Step-by-Step Configuration

### 1. Access Customer Account API Settings

1. Go to your Shopify admin: `https://admin.shopify.com/store/loza-har-gerzim`
2. Navigate to: **Settings** → **Customer accounts** → **Customer Account API**
3. Find the **Application setup** section (shown in your screenshot)

---

### 2. Fill in Required Fields

You need to configure these three fields:

#### **1. Callback URI(s)** ⚠️ Required

**For Development (localhost)**:
```
http://localhost:3000
```

**For Production**:
```
https://your-actual-domain.com
```

**Important**: 
- Use `http://localhost:3000` for local development (with http://)
- Use `https://` for production domains
- Click "+ Add callback URI" to add multiple URLs
- **Do NOT use** `https://localhost:3000` - it will show an error

---

#### **2. Javascript origin(s)** ⚠️ Required

**For Development**:
```
localhost:3000
```

**For Production**:
```
your-actual-domain.com
```

**Important**:
- **Only specify the hostname** - NO `http://` or `https://`
- Just the domain and port (e.g., `localhost:3000`)
- Click "+ Add origin" to add multiple origins

---

#### **3. Logout URI** (Optional but Recommended)

**For Development**:
```
http://localhost:3000
```

**For Production**:
```
https://your-actual-domain.com
```

**Important**:
- Same format as Callback URIs
- Click "+ Add Logout URI" to add multiple URLs

---

### 3. Application Endpoints (Auto-Generated)

These are **automatically provided** by Shopify - you don't need to fill these in:

- **Authorization endpoint**: `https://shopify.com/authentication/96979714351/oauth/authorize`
- **Token endpoint**: `https://shopify.com/authentication/96979714351/oauth/token`
- **Logout endpoint**: `https://shopify.com/authentication/96979714351/logout`

---

## 🔧 Current Implementation

Your site now uses **Shopify's native account system**:

### **Registration**
- Clicking "Create Account" redirects to: `https://loza-har-gerzim.myshopify.com/account/register`
- Customers create accounts directly on Shopify
- After registration, they're redirected back to your site

### **Login**
- Clicking "Login" redirects to: `https://loza-har-gerzim.myshopify.com/account/login`
- Customers log in through Shopify's secure page
- After login, they're redirected back to your site

### **Account Dashboard**
- The `/account` page will show customer information
- Requires the customer to be logged in through Shopify

---

## 🎯 Why This Approach?

**Benefits**:
- ✅ **Secure**: Shopify handles all authentication
- ✅ **Compliant**: Meets all security standards
- ✅ **Reliable**: No custom auth code to maintain
- ✅ **Tested**: Shopify's battle-tested system
- ✅ **Simple**: No complex API configuration needed

**What Changed**:
- Removed custom registration forms
- Removed custom login forms
- Now redirects to Shopify's native pages
- Simpler, more secure implementation

---

## 🚀 Next Steps

1. **Fill in the Shopify admin fields** as described above
2. **Save the configuration** in Shopify admin
3. **Test registration**: Go to `/register` and try creating an account
4. **Test login**: Go to `/login` and try logging in
5. **Test account page**: After login, visit `/account`

---

## 🔒 Security Notes

- All authentication happens on Shopify's secure servers
- Your site never handles passwords directly
- Customer data is stored securely in Shopify
- OAuth 2.0 standard authentication flow

---

## 📝 Environment Variables

Make sure these are set in your `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=loza-har-gerzim.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=5d5fc0b489a5d565e54fbd5ba996f0b4
SHOPIFY_API_VERSION=2026-01
SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID=767890da-4672-47a9-968c-0628e5e7f431
```

---

## ❓ Troubleshooting

**Issue**: "Failed to create customer"
- **Solution**: Fill in the Callback URI and Javascript origin fields in Shopify admin

**Issue**: Redirect doesn't work
- **Solution**: Make sure your domain is added to the allowed URIs in Shopify admin

**Issue**: Can't access account page
- **Solution**: Make sure you're logged in through Shopify first

---

## 📚 Additional Resources

- [Shopify Customer Account API Documentation](https://shopify.dev/docs/api/customer)
- [OAuth 2.0 Flow](https://shopify.dev/docs/apps/auth/oauth)
- [Customer Account Authentication](https://shopify.dev/docs/api/customer#authentication)
