import client from './client';
import {
  GET_COLLECTION_QUERY,
  GET_ALL_COLLECTIONS_QUERY,
  GET_COLLECTIONS_WITH_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from './queries';
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ProductMetafield,
} from './types';

export async function getCollection(handle: string): Promise<ShopifyCollection | null> {
  try {
    const { data, errors } = await client.request(GET_COLLECTION_QUERY, {
      variables: { handle },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    return data?.collection || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function getAllCollections(first: number = 10, locale?: string): Promise<ShopifyCollection[]> {
  try {
    // Map locale to Shopify language codes
    const languageMap: Record<string, string> = {
      'en': 'EN',
      'he': 'HE',
      'ar': 'AR',
    };
    
    const language = locale ? languageMap[locale] || 'EN' : 'EN';
    
    const { data, errors } = await client.request(GET_ALL_COLLECTIONS_QUERY, {
      variables: { first, language },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return [];
    }

    return data?.collections?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getCollectionsWithProducts(first: number = 10, productsFirst: number = 5, locale?: string): Promise<ShopifyCollection[]> {
  try {
    const languageMap: Record<string, string> = {
      'en': 'EN',
      'he': 'HE',
      'ar': 'AR',
    };
    
    const language = locale ? languageMap[locale] || 'EN' : 'EN';
    
    const { data, errors } = await client.request(GET_COLLECTIONS_WITH_PRODUCTS_QUERY, {
      variables: { first, productsFirst, language },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return [];
    }

    return data?.collections?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching collections with products:', error);
    return [];
  }
}

export async function getProduct(handle: string, locale?: string): Promise<ShopifyProduct | null> {
  try {
    // Map locale to Shopify language codes
    const languageMap: Record<string, string> = {
      'en': 'EN',
      'he': 'HE',
      'ar': 'AR',
    };
    
    const language = locale ? languageMap[locale] || 'EN' : 'EN';
    
    const { data, errors } = await client.request(GET_PRODUCT_QUERY, {
      variables: { handle, language },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    return data?.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProducts(query?: string, first: number = 20, locale?: string): Promise<ShopifyProduct[]> {
  try {
    // Map locale to Shopify language codes
    const languageMap: Record<string, string> = {
      'en': 'EN',
      'he': 'HE',
      'ar': 'AR',
    };
    
    const language = locale ? languageMap[locale] || 'EN' : 'EN';
    
    const { data, errors } = await client.request(GET_PRODUCTS_QUERY, {
      variables: { first, query, language },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return [];
    }

    return data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function searchProducts(query: string, first: number = 20, locale?: string): Promise<ShopifyProduct[]> {
  try {
    // Map locale to Shopify language codes
    const languageMap: Record<string, string> = {
      'en': 'EN',
      'he': 'HE',
      'ar': 'AR',
    };
    
    const language = locale ? languageMap[locale] || 'EN' : 'EN';
    
    const { data, errors } = await client.request(SEARCH_PRODUCTS_QUERY, {
      variables: { query, first, language },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return [];
    }

    return data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function createCart(): Promise<ShopifyCart | null> {
  try {
    const { data, errors } = await client.request(CREATE_CART_MUTATION, {
      variables: {
        input: {},
      },
    });

    if (errors || data?.cartCreate?.userErrors?.length > 0) {
      console.error('Shopify API errors:', errors || data?.cartCreate?.userErrors);
      return null;
    }

    return data?.cartCreate?.cart || null;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<ShopifyCart | null> {
  try {
    const variables = {
      cartId,
      lines: [
        {
          merchandiseId,
          quantity,
        },
      ],
    };
    console.log('addToCart called with:', JSON.stringify({ cartId, merchandiseId, quantity, variables }));
    
    const { data, errors } = await client.request(ADD_TO_CART_MUTATION, {
      variables,
    });

    if (errors || data?.cartLinesAdd?.userErrors?.length > 0) {
      console.error('Shopify API errors:', errors || data?.cartLinesAdd?.userErrors);
      return null;
    }

    const cart = data?.cartLinesAdd?.cart || null;
    console.log('Shopify addToCart response:', JSON.stringify({ 
      totalQuantity: cart?.totalQuantity, 
      lineCount: cart?.lines?.edges?.length,
      lines: cart?.lines?.edges?.map((e: any) => ({ id: e.node.id, quantity: e.node.quantity }))
    }));
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  try {
    const { data, errors } = await client.request(UPDATE_CART_MUTATION, {
      variables: {
        cartId,
        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      },
    });

    if (errors || data?.cartLinesUpdate?.userErrors?.length > 0) {
      console.error('Shopify API errors:', errors || data?.cartLinesUpdate?.userErrors);
      return null;
    }

    return data?.cartLinesUpdate?.cart || null;
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  try {
    const { data, errors } = await client.request(REMOVE_FROM_CART_MUTATION, {
      variables: {
        cartId,
        lineIds,
      },
    });

    if (errors || data?.cartLinesRemove?.userErrors?.length > 0) {
      console.error('Shopify API errors:', errors || data?.cartLinesRemove?.userErrors);
      return null;
    }

    return data?.cartLinesRemove?.cart || null;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const { data, errors } = await client.request(GET_CART_QUERY, {
      variables: { cartId },
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    return data?.cart || null;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export function parseMetafields(metafields: any[]): ProductMetafield {
  const parsed: ProductMetafield = {};
  
  metafields?.forEach((field) => {
    if (field && field.key && field.value) {
      parsed[field.key as keyof ProductMetafield] = field.value;
    }
  });

  return parsed;
}

export function formatPrice(amount: string, currencyCode: string = 'ILS', locale: string = 'en-US'): string {
  const price = parseFloat(amount);
  
  // Map locale to appropriate number format locale
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'he': 'he-IL',
    'ar': 'ar-IL',
  };
  
  const formatLocale = localeMap[locale] || locale;
  
  return new Intl.NumberFormat(formatLocale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}
