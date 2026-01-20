'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ShopifyCart } from '@/lib/shopify/types';

interface CartContextType {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  addToCart: (merchandiseId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedCartId = localStorage.getItem('shopify_cart_id');
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId);
    }
  }, []);

  const fetchCart = async (id: string) => {
    try {
      const response = await fetch(`/api/cart?cartId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (merchandiseId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, merchandiseId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cart provider received:', JSON.stringify({ id: data.cart?.id, totalQuantity: data.cart?.totalQuantity }));
        setCart(data.cart);
        if (data.cart?.id) {
          setCartId(data.cart.id);
          localStorage.setItem('shopify_cart_id', data.cart.id);
        }
      } else {
        console.error('Failed to add to cart, response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, lineId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, lineId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    if (cartId) {
      await fetchCart(cartId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
