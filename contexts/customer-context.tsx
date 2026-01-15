'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCustomer, loginCustomer, logoutCustomer, createCustomer, type Customer, type CustomerLoginInput, type CustomerCreateInput } from '@/lib/shopify/customer';

interface CustomerContextType {
  customer: Customer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: CustomerLoginInput) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: CustomerCreateInput) => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const CUSTOMER_TOKEN_KEY = 'shopify_customer_token';
const TOKEN_EXPIRY_KEY = 'shopify_customer_token_expiry';

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(CUSTOMER_TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (token && expiry) {
      const expiryDate = new Date(expiry);
      if (expiryDate > new Date()) {
        setAccessToken(token);
        loadCustomer(token);
      } else {
        localStorage.removeItem(CUSTOMER_TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadCustomer = async (token: string) => {
    try {
      const customerData = await getCustomer(token);
      setCustomer(customerData);
    } catch (error) {
      console.error('Failed to load customer:', error);
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (input: CustomerLoginInput) => {
    try {
      const tokenData = await loginCustomer(input);
      localStorage.setItem(CUSTOMER_TOKEN_KEY, tokenData.accessToken);
      localStorage.setItem(TOKEN_EXPIRY_KEY, tokenData.expiresAt);
      setAccessToken(tokenData.accessToken);
      await loadCustomer(tokenData.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    if (accessToken) {
      try {
        await logoutCustomer(accessToken);
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setAccessToken(null);
    setCustomer(null);
  };

  const register = async (input: CustomerCreateInput) => {
    try {
      await createCustomer(input);
      await login({ email: input.email, password: input.password });
    } catch (error) {
      throw error;
    }
  };

  const refreshCustomer = async () => {
    if (accessToken) {
      await loadCustomer(accessToken);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        login,
        logout,
        register,
        refreshCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}
