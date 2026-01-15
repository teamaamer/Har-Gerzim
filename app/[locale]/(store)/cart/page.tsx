import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { CartPageContent } from '@/components/cart/cart-page-content';

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          {dict.nav.cart}
        </h1>
        <CartPageContent locale={locale} dict={dict} />
      </div>
    </div>
  );
}
