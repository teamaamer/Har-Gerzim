import { getDictionary } from '@/lib/i18n/get-dictionary';
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

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="min-h-screen">
        <div className="container max-w-4xl py-12">
          {children}
        </div>
      </main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
