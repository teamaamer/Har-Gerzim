'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UserPlus, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface RegisterFormProps {
  locale: Locale;
  dict: any;
}

const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'loza-har-gerzim.myshopify.com';

export function RegisterForm({ locale, dict }: RegisterFormProps) {
  const handleRegister = () => {
    // Redirect to Shopify's native account creation page
    window.location.href = `https://${SHOPIFY_STORE_URL}/account/register`;
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
            <div className="p-4 bg-gold-100 rounded-full">
              <UserPlus className="h-12 w-12 text-gold-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-navy-900">
              {dict.account?.register?.title || 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {dict.account?.register?.subtitle || 'Join us today and start shopping'}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={handleRegister}
              className="w-full bg-gold-600 hover:bg-gold-700 text-navy-900 font-bold"
              size="lg"
            >
              {dict.account?.register?.createButton || 'Create Account'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground">
              {dict.account?.register?.redirectNote || 'You will be redirected to our secure registration page'}
            </p>
          </div>

          <div className="text-center text-sm pt-4 border-t">
            <span className="text-muted-foreground">
              {dict.account?.register?.hasAccount || 'Already have an account?'}{' '}
            </span>
            <Link
              href={`/${locale}/login`}
              className="text-gold-600 hover:text-gold-700 font-medium hover:underline"
            >
              {dict.account?.register?.login || 'Login'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
