import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getAllCollections } from '@/lib/shopify';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Locale } from '@/lib/i18n/config';

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const collections = await getAllCollections(20, locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} collections={collections} />
      <main className="min-h-screen">
        <div className="container max-w-4xl py-12">
          {children}
        </div>
      </main>
      <Footer locale={locale as Locale} dict={dict} collections={collections} />
    </>
  );
}
