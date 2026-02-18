'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogIn, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface LoginFormProps {
  locale: Locale;
  dict: any;
}

const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'mount-gerizim-2.myshopify.com';

export function LoginForm({ locale, dict }: LoginFormProps) {
  const handleLogin = () => {
    // Redirect to Shopify's native login page
    window.location.href = `https://${SHOPIFY_STORE_URL}/account/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-4 bg-navy-100 rounded-full">
              <LogIn className="h-12 w-12 text-navy-900" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-navy-900">
              {dict.account?.login?.title || 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground">
              {dict.account?.login?.subtitle || 'Login to your account'}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={handleLogin}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold"
              size="lg"
            >
              {dict.account?.login?.loginButton || 'Login'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground">
              {dict.account?.login?.redirectNote || 'You will be redirected to our secure login page'}
            </p>
          </div>

          <div className="text-center text-sm pt-4 border-t">
            <span className="text-muted-foreground">
              {dict.account?.login?.noAccount || "Don't have an account?"}{' '}
            </span>
            <Link
              href={`/${locale}/register`}
              className="text-gold-600 hover:text-gold-700 font-medium hover:underline"
            >
              {dict.account?.login?.register || 'Register'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
