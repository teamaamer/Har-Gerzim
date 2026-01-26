import { Inter, Heebo } from 'next/font/google';
import { locales, type Locale, localeDirections } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getAllCollections } from '@/lib/shopify';
import { CartProvider } from '@/components/cart/cart-provider';
import { CustomerProvider } from '@/contexts/customer-context';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { AgeGateProvider } from '@/components/age-gate/age-gate-provider';
import { PageTransition } from '@/components/page-transition';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: {
      default: dict.footer.businessName,
      template: `%s | ${dict.footer.businessName}`,
    },
    description: dict.home.hero.description,
    keywords: ['tahini', 'hummus', 'olive oil', 'Mount Gerizim', 'Har Bracha', 'Israeli products'],
    authors: [{ name: dict.footer.businessName }],
    openGraph: {
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      siteName: dict.footer.businessName,
      title: dict.footer.businessName,
      description: dict.home.hero.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeTyped = locale as Locale;
  const direction = localeDirections[localeTyped];
  const fontClass = locale === 'he' ? heebo.variable : inter.variable;
  const dict = await getDictionary(localeTyped);
  const collections = await getAllCollections(20, locale);

  return (
    <html lang={locale} dir={direction} className={fontClass}>
      <body className={locale === 'he' ? 'font-hebrew' : 'font-sans'}>
        <AgeGateProvider locale={localeTyped} dict={dict}>
          <CustomerProvider>
            <CartProvider>
              <Header locale={localeTyped} dict={dict} collections={collections} />
              <PageTransition>
                {children}
              </PageTransition>
              <Footer locale={localeTyped} dict={dict} collections={collections} />
              <CookieConsentBanner dict={dict} />
            </CartProvider>
          </CustomerProvider>
        </AgeGateProvider>
      </body>
    </html>
  );
}
