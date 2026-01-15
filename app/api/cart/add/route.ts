import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { cartId, merchandiseId, quantity } = await request.json();

    let cart;
    if (cartId) {
      cart = await addToCart(cartId, merchandiseId, quantity);
    } else {
      cart = await createCart();
      if (cart) {
        cart = await addToCart(cart.id, merchandiseId, quantity);
      }
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
