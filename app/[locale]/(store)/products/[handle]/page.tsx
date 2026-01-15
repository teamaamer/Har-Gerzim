import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getProduct, formatPrice, parseMetafields } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AddToCartButton } from '@/components/products/add-to-cart-button';
import { ProductGallery } from '@/components/products/product-gallery';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Award, Package } from 'lucide-react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  const dict = await getDictionary(locale);
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);
  const defaultVariant = variants[0];
  const metafields = parseMetafields(product.metafields);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href={`/${locale}`} className="hover:text-navy-900 transition-colors">
            {dict.common.shopNow || 'Home'}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/${locale}/collections/all`} className="hover:text-navy-900 transition-colors">
            {dict.home.collections.title || 'Products'}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy-900 font-medium line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start max-w-xl mx-auto lg:mx-0 w-full">
            <ProductGallery images={images} productTitle={product.title} />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Product Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Price and Availability */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold-600 to-gold-500 bg-clip-text text-transparent">
                  {formatPrice(defaultVariant.price.amount, defaultVariant.price.currencyCode)}
                </span>
                {product.availableForSale ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {dict.common.inStock || 'In Stock'}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-red-300 text-red-600">
                    {dict.common.outOfStock}
                  </Badge>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Short Description */}
            {product.description && (
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            )}

            {/* Product Specifications Cards */}
            {(metafields.abv || metafields.size_ml) && (
              <div className="grid grid-cols-2 gap-3">
                {metafields.size_ml && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-50 border border-navy-100">
                    <Package className="h-5 w-5 text-navy-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-navy-600 font-medium">{dict.product.size}</p>
                      <p className="text-lg font-bold text-navy-900">{metafields.size_ml}ml</p>
                    </div>
                  </div>
                )}
                {metafields.abv && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gold-50 border border-gold-100">
                    <Award className="h-5 w-5 text-gold-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gold-600 font-medium">{dict.product.abv}</p>
                      <p className="text-lg font-bold text-gold-900">{metafields.abv}%</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-lg">
              <AddToCartButton
                product={product}
                defaultVariant={defaultVariant}
                locale={locale}
                dict={dict}
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200">
                <Truck className="h-4 w-4 text-navy-600 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700">{dict.shipping.deliveryTime?.split(':')[0] || 'Fast Delivery'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200">
                <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700">{dict.home.trust.secureCheckout || 'Secure Checkout'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200 col-span-2 md:col-span-1">
                <RotateCcw className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700">{dict.returns.title?.split('&')[0] || 'Easy Returns'}</span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Accordion Sections */}
            <Accordion type="multiple" className="w-full">
            {product.descriptionHtml && (
              <AccordionItem value="description">
                <AccordionTrigger>{dict.product.description}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                </AccordionContent>
              </AccordionItem>
            )}

            {metafields.ingredients && (
              <AccordionItem value="ingredients">
                <AccordionTrigger>{dict.product.ingredients}</AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-wrap">{metafields.ingredients}</p>
                </AccordionContent>
              </AccordionItem>
            )}

            {(metafields.kosher || metafields.allergens || metafields.storage || metafields.shelf_life) && (
              <AccordionItem value="specifications">
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

            <AccordionItem value="shipping">
              <AccordionTrigger>{dict.product.shipping}</AccordionTrigger>
              <AccordionContent>
                <p>{dict.shipping.deliveryTime}</p>
                <p className="mt-2">{dict.shipping.israelOnly}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger>{dict.product.returns}</AccordionTrigger>
              <AccordionContent>
                <p>{dict.returns.consumerLaw}</p>
                <p className="mt-2">{dict.returns.howToCancel}</p>
              </AccordionContent>
            </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
