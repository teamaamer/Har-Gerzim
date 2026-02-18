import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { cartId, merchandiseId, quantity } = await request.json();

    let cart;
    if (cartId) {
      // Try to add to existing cart
      cart = await addToCart(cartId, merchandiseId, quantity);
      
      // If cart is null (expired/invalid), create a new cart and add the item
      if (!cart) {
        console.log('Cart invalid or expired, creating new cart');
        cart = await createCart();
        if (cart) {
          cart = await addToCart(cart.id, merchandiseId, quantity);
        }
      }
    } else {
      // No cart ID provided, create new cart
      cart = await createCart();
      if (cart) {
        cart = await addToCart(cart.id, merchandiseId, quantity);
      }
    }

    console.log('Cart after add:', JSON.stringify({ id: cart?.id, totalQuantity: cart?.totalQuantity, lineCount: cart?.lines?.edges?.length }));
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
