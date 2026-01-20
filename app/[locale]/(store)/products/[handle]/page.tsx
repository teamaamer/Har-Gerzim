import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getProduct, parseMetafields } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductClientWrapper } from '@/components/products/product-client-wrapper';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Award, Package } from 'lucide-react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  const dict = await getDictionary(locale);
  const product = await getProduct(handle, locale);

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);
  const defaultVariant = variants[0];
  const metafields = parseMetafields(product.metafields);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-nowrap items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500 mb-4 md:mb-6 overflow-hidden">
          <Link href={`/${locale}`} className="hover:text-navy-900 transition-colors whitespace-nowrap flex-shrink-0 inline-flex items-center">
            {dict.common.shopNow || 'Home'}
          </Link>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
          <Link href={`/${locale}/collections/all`} className="hover:text-navy-900 transition-colors whitespace-nowrap flex-shrink-0 inline-flex items-center">
            {dict.home.collections.title || 'Products'}
          </Link>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
          <span className="text-navy-900 font-medium truncate min-w-0 inline-flex items-center">{product.title}</span>
        </nav>


        <ProductClientWrapper
          product={product}
          images={images}
          variants={variants}
          defaultVariant={defaultVariant}
          locale={locale}
          dict={dict}
        >
          {/* Product Specifications Cards */}
          <div className="space-y-6 mt-6">
            {(metafields.abv || metafields.size_ml) && (
              <div className="grid grid-cols-2 gap-3">
                {metafields.size_ml && (
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100/50 border border-navy-200 hover:shadow-md transition-all">
                    <Package className="h-6 w-6 text-navy-600 mb-2" />
                    <p className="text-xs text-navy-600 font-medium uppercase tracking-wide">{dict.product.size}</p>
                    <p className="text-2xl font-bold text-navy-900 mt-1">{metafields.size_ml}<span className="text-sm">ml</span></p>
                  </div>
                )}
                {metafields.abv && (
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100/50 border border-gold-200 hover:shadow-md transition-all">
                    <Award className="h-6 w-6 text-gold-600 mb-2" />
                    <p className="text-xs text-gold-600 font-medium uppercase tracking-wide">{dict.product.abv}</p>
                    <p className="text-2xl font-bold text-gold-900 mt-1">{metafields.abv}<span className="text-sm">%</span></p>
                  </div>
                )}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/30 border border-blue-200 hover:shadow-md transition-all">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-900 text-center leading-tight">{dict.shipping.deliveryTime?.split(':')[0] || 'Fast Delivery'}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200 hover:shadow-md transition-all">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-xs font-semibold text-green-900 text-center leading-tight">{dict.home.trust.secureCheckout || 'Secure'}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/30 border border-purple-200 hover:shadow-md transition-all">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-semibold text-purple-900 text-center leading-tight">{dict.returns.title?.split('&')[0] || 'Returns'}</span>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8">
            <Accordion type="multiple" className="w-full space-y-2">
            {product.descriptionHtml && (
              <AccordionItem value="description" className="border border-gray-200 rounded-xl px-4 bg-white hover:shadow-sm transition-all">
                <AccordionTrigger>{dict.product.description}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                </AccordionContent>
              </AccordionItem>
            )}

            {metafields.ingredients && (
              <AccordionItem value="ingredients" className="border border-gray-200 rounded-xl px-4 bg-white hover:shadow-sm transition-all">
                <AccordionTrigger>{dict.product.ingredients}</AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-wrap">{metafields.ingredients}</p>
                </AccordionContent>
              </AccordionItem>
            )}

            {(metafields.kosher || metafields.allergens || metafields.storage || metafields.shelf_life) && (
              <AccordionItem value="specifications" className="border border-gray-200 rounded-xl px-4 bg-white hover:shadow-sm transition-all">
                <AccordionTrigger>{dict.product.specifications}</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2">
                    {metafields.kosher && (
                      <>
                        <dt className="font-semibold">{dict.product.kosher}:</dt>
                        <dd className="text-muted-foreground">{metafields.kosher}</dd>
                      </>
                    )}
                    {metafields.allergens && (
                      <>
                        <dt className="font-semibold">{dict.product.allergens}:</dt>
                        <dd className="text-muted-foreground">{metafields.allergens}</dd>
                      </>
                    )}
                    {metafields.storage && (
                      <>
                        <dt className="font-semibold">{dict.product.storage}:</dt>
                        <dd className="text-muted-foreground">{metafields.storage}</dd>
                      </>
                    )}
                    {metafields.shelf_life && (
                      <>
                        <dt className="font-semibold">{dict.product.shelfLife}:</dt>
                        <dd className="text-muted-foreground">{metafields.shelf_life}</dd>
                      </>
                    )}
                    {metafields.harvest_year && (
                      <>
                        <dt className="font-semibold">{dict.product.harvestYear}:</dt>
                        <dd className="text-muted-foreground">{metafields.harvest_year}</dd>
                      </>
                    )}
                    {metafields.acidity && (
                      <>
                        <dt className="font-semibold">{dict.product.acidity}:</dt>
                        <dd className="text-muted-foreground">{metafields.acidity}</dd>
                      </>
                    )}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="shipping" className="border border-gray-200 rounded-xl px-4 bg-white hover:shadow-sm transition-all">
              <AccordionTrigger>{dict.product.shipping}</AccordionTrigger>
              <AccordionContent>
                <p>{dict.shipping.deliveryTime}</p>
                <p className="mt-2">{dict.shipping.israelOnly}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="border border-gray-200 rounded-xl px-4 bg-white hover:shadow-sm transition-all">
              <AccordionTrigger>{dict.product.returns}</AccordionTrigger>
              <AccordionContent>
                <p>{dict.returns.consumerLaw}</p>
                <p className="mt-2">{dict.returns.howToCancel}</p>
              </AccordionContent>
            </AccordionItem>
            </Accordion>
            </div>
          </div>
        </ProductClientWrapper>
      </div>
    </div>
  );
}
