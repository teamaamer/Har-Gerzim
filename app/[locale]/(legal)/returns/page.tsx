import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function ReturnsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.returns.title}</h1>
      <div className="space-y-4">
        <p>{dict.returns.consumerLaw}</p>
        <p>{dict.returns.howToCancel}</p>
        <p>{dict.returns.cancellationFee}</p>
        <p>{dict.returns.refund}</p>
        <p>{dict.returns.condition}</p>
      </div>
    </article>
  );
}
