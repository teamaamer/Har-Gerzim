import { NextRequest, NextResponse } from 'next/server';
import { removeFromCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { cartId, lineId } = await request.json();

    if (!cartId || !lineId) {
      return NextResponse.json({ error: 'Cart ID and Line ID required' }, { status: 400 });
    }

    const cart = await removeFromCart(cartId, [lineId]);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}
