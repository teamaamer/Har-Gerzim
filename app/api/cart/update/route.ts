import { NextRequest, NextResponse } from 'next/server';
import { updateCartLine } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { cartId, lineId, quantity } = await request.json();

    if (!cartId || !lineId) {
      return NextResponse.json({ error: 'Cart ID and Line ID required' }, { status: 400 });
    }

    const cart = await updateCartLine(cartId, lineId, quantity);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}
