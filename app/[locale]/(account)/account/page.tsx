import { AccountDashboard } from '@/components/auth/account-dashboard';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';

export default async function AccountPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <AccountDashboard locale={locale} dict={dict} />;
}
