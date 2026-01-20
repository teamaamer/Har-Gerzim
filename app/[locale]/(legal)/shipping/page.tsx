import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function ShippingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.shipping.title}</h1>
      <div className="space-y-4">
        <p>{dict.shipping.israelOnly}</p>
        <p>{dict.shipping.deliveryTime}</p>
        <p>{dict.shipping.businessDays}</p>
        <p>{dict.shipping.pickup}</p>
        <p>{dict.shipping.cost}</p>
      </div>
    </article>
  );
}
