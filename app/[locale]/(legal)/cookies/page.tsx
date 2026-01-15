import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function CookiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.cookies.title}</h1>
      <p>{dict.cookies.intro}</p>
      
      <h2>{dict.cookies.whatAreCookies}</h2>
      <p>{dict.cookies.whatAreCookiesContent}</p>
      
      <h2>{dict.cookies.types}</h2>
      
      <h3>{dict.cookies.essential}</h3>
      <p>{dict.cookies.essentialContent}</p>
      
      <h3>{dict.cookies.functional}</h3>
      <p>{dict.cookies.functionalContent}</p>
      
      <h3>{dict.cookies.analytics}</h3>
      <p>{dict.cookies.analyticsContent}</p>
      
      <h2>{dict.cookies.manage}</h2>
      <p>{dict.cookies.manageContent}</p>
    </article>
  );
}
