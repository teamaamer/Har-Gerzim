import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getCollection, getProducts } from '@/lib/shopify';
import type { Locale } from '@/lib/i18n/config';
import { ProductCard } from '@/components/products/product-card';
import { notFound } from 'next/navigation';

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  const dict = await getDictionary(locale);
  
  // Handle "all" as a special case to fetch all products
  if (handle === 'all') {
    const allProducts = await getProducts(undefined, 100, locale); // Fetch up to 100 products
    
    const allProductsTitle = locale === 'he' 
      ? 'כל המוצרים' 
      : locale === 'ar'
      ? 'جميع المنتجات'
      : 'All Products';
    
    const allProductsDescription = locale === 'he'
      ? 'עיין באוסף המלא שלנו של מוצרים איכותיים'
      : locale === 'ar'
      ? 'تصفح مجموعتنا الكاملة من المنتجات المميزة'
      : 'Browse our complete collection of premium products';
    
    return (
<<<<<<< HEAD
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-2">
            {allProductsTitle}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
=======
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {allProductsTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
            {allProductsDescription}
          </p>
        </div>

        {allProducts.length === 0 ? (
<<<<<<< HEAD
          <div className="text-center py-12 md:py-16">
            <p className="text-base md:text-lg text-muted-foreground">
=======
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
              No products found.
            </p>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Regular collection handling
  const collection = await getCollection(handle);

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map((edge) => edge.node);

  return (
<<<<<<< HEAD
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-2">{collection.title}</h1>
        {collection.description && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
=======
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
            {collection.description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
<<<<<<< HEAD
        <div className="text-center py-12 md:py-16">
          <p className="text-base md:text-lg text-muted-foreground">
=======
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
            No products found in this collection.
          </p>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
