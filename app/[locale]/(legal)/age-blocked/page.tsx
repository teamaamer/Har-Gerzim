import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { AlertCircle } from 'lucide-react';

export default async function AgeBlockedPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-3xl font-bold mb-4">{dict.ageGate.blocked.title}</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        {dict.ageGate.blocked.message}
      </p>
    </div>
  );
}
