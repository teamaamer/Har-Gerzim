import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { AlertCircle } from 'lucide-react';

export default async function AgeBlockedPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-navy-800 rounded-2xl shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">
          {dict.ageGate.blocked.title}
        </h1>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {dict.ageGate.blocked.message}
        </p>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {dict.footer.businessName}
        </div>
      </div>
    </div>
  );
}
