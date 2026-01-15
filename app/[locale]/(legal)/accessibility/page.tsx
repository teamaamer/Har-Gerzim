import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.accessibility.title}</h1>
      <p>{dict.accessibility.intro}</p>
      
      <h2>{dict.accessibility.compliance}</h2>
      <p>{dict.accessibility.complianceContent}</p>
      
      <h2>{dict.accessibility.features}</h2>
      <p>{dict.accessibility.featuresContent}</p>
      
      <h2>{dict.accessibility.feedback}</h2>
      <p>{dict.accessibility.feedbackContent}</p>
      
      <p className="text-sm text-muted-foreground mt-8">
        {dict.accessibility.date}: {new Date().toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US')}
      </p>
    </article>
  );
}
