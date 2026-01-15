import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getProducts } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import { HeroSection } from '@/components/home/hero-section';
import { ScrollVideo } from '@/components/home/scroll-video';
import { FeaturedCollections } from '@/components/home/featured-collections';
import { BestSellers } from '@/components/home/best-sellers';
import { WhyLoza } from '@/components/home/why-loza';
import { StorySection } from '@/components/home/story-section';
import { TrustPolicies } from '@/components/home/trust-policies';
import { FaqPreview } from '@/components/home/faq-preview';
import { ContactCta } from '@/components/home/contact-cta';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const products = await getProducts(undefined, 8);

  return (
    <>
      <main id="main-content" className="flex flex-col">
        <section id="home">
          <HeroSection locale={locale} dict={dict} />
        </section>
        
        <ScrollVideo locale={locale} dict={dict} />
        
        <section id="collections">
          <FeaturedCollections locale={locale} dict={dict} />
        </section>
        
        <BestSellers locale={locale} dict={dict} products={products} />
        
        <WhyLoza locale={locale} dict={dict} />
        
        <section id="about">
          <StorySection locale={locale} dict={dict} />
        </section>
        
        <TrustPolicies locale={locale} dict={dict} />
        
        <section id="faq">
          <FaqPreview locale={locale} dict={dict} />
        </section>
        
        <section id="contact">
          <ContactCta locale={locale} dict={dict} />
        </section>
      </main>
    </>
  );
}
