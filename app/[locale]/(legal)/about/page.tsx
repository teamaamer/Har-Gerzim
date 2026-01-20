import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.about.title}</h1>
      <div className="whitespace-pre-wrap">{dict.about.content}</div>
    </article>
  );
}
