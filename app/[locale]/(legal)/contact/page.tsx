import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{dict.contact.title}</h1>
        <p className="text-lg text-muted-foreground">{dict.contact.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
            <h2 className="text-2xl font-semibold mb-4">{dict.common.contactUs}</h2>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">{dict.common.phone}</p>
                <a href="tel:0522738783" className="text-primary hover:underline">
                  052-2738783
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">{dict.common.address}</p>
                <p className="text-muted-foreground">{dict.footer.businessAddress}</p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full" size="lg">
                <a href="tel:0522738783">
                  <Phone className="mr-2 h-5 w-5" />
                  {dict.contact.call}
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <a href="https://wa.me/972522738783" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {dict.contact.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <ContactForm locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
