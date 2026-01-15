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
    const allProducts = await getProducts(undefined, 100); // Fetch up to 100 products
    
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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {allProductsTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {allProductsDescription}
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {collection.description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No products found in this collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
