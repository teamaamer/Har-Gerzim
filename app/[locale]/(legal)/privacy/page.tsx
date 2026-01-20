import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{dict.privacy.title}</h1>
      <p>{dict.privacy.intro}</p>
      
      <h2>{dict.privacy.dataCollected}</h2>
      <p>{dict.privacy.dataCollectedContent}</p>
      
      <h2>{dict.privacy.purpose}</h2>
      <p>{dict.privacy.purposeContent}</p>
      
      <h2>{dict.privacy.thirdParties}</h2>
      <p>{dict.privacy.thirdPartiesContent}</p>
      
      <h2>{dict.privacy.security}</h2>
      <p>{dict.privacy.securityContent}</p>
      
      <h2>{dict.privacy.retention}</h2>
      <p>{dict.privacy.retentionContent}</p>
      
      <h2>{dict.privacy.rights}</h2>
      <p>{dict.privacy.rightsContent}</p>
      
      <h2>{dict.privacy.cookies}</h2>
      <p>{dict.privacy.cookiesContent}</p>
      
      <h2>{dict.privacy.contact}</h2>
      <p>{dict.privacy.contactContent}</p>
    </article>
  );
}
