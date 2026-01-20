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

<<<<<<< HEAD
    console.log('Cart after add:', JSON.stringify({ id: cart?.id, totalQuantity: cart?.totalQuantity, lineCount: cart?.lines?.edges?.length }));
=======
>>>>>>> 067bdc9f387a3afea5b22a5a803dba1176f21dc6
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
