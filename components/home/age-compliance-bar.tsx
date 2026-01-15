import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface AgeComplianceBarProps {
  locale: Locale;
  dict: any;
}

export function AgeComplianceBar({ locale, dict }: AgeComplianceBarProps) {
  return (
    <div className="bg-navy-900 text-white py-2 border-b border-gold-600/20">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-gold-400" />
          <span>{dict.home.ageCompliance.notice}</span>
          <Link 
            href={`/${locale}/legal`}
            className="underline hover:text-gold-400 transition-colors"
          >
            {dict.home.ageCompliance.link}
          </Link>
        </div>
      </div>
    </div>
  );
}
