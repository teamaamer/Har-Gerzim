'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCustomer } from '@/contexts/customer-context';
import { Package, User, MapPin, LogOut, Mail, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { formatPrice } from '@/lib/shopify';
import Link from 'next/link';

interface AccountDashboardProps {
  locale: Locale;
  dict: any;
}

export function AccountDashboard({ locale, dict }: AccountDashboardProps) {
  const { customer, isLoading, isAuthenticated, logout } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isLoading, isAuthenticated, router, locale]);

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}`);
  };

  if (isLoading || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-white py-12">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
                {dict.account?.dashboard?.title || 'My Account'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {dict.account?.dashboard?.welcome || 'Welcome back'}, {customer.firstName || customer.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {dict.account?.dashboard?.logout || 'Logout'}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-navy-100 rounded-full">
                  <User className="h-6 w-6 text-navy-900" />
                </div>
                <h2 className="text-xl font-semibold text-navy-900">
                  {dict.account?.dashboard?.profile || 'Profile'}
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{customer.firstName} {customer.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${locale}/account/profile`}>
                  {dict.account?.dashboard?.editProfile || 'Edit Profile'}
                </Link>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gold-100 rounded-full">
                  <MapPin className="h-6 w-6 text-gold-700" />
                </div>
                <h2 className="text-xl font-semibold text-navy-900">
                  {dict.account?.dashboard?.addresses || 'Addresses'}
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                {customer.defaultAddress ? (
                  <div className="text-muted-foreground">
                    <p className="font-medium text-navy-900">{dict.account?.dashboard?.defaultAddress || 'Default Address'}</p>
                    <p>{customer.defaultAddress.address1}</p>
                    {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                    <p>{customer.defaultAddress.city}, {customer.defaultAddress.zip}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {dict.account?.dashboard?.noAddress || 'No address saved'}
                  </p>
                )}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${locale}/account/addresses`}>
                  {dict.account?.dashboard?.manageAddresses || 'Manage Addresses'}
                </Link>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Package className="h-6 w-6 text-green-700" />
                </div>
                <h2 className="text-xl font-semibold text-navy-900">
                  {dict.account?.dashboard?.orders || 'Orders'}
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-2xl font-bold text-navy-900">
                  {customer.orders?.length || 0}
                </p>
                <p className="text-muted-foreground">
                  {dict.account?.dashboard?.totalOrders || 'Total orders'}
                </p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${locale}/account/orders`}>
                  {dict.account?.dashboard?.viewOrders || 'View Orders'}
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-navy-900 mb-6">
              {dict.account?.dashboard?.recentOrders || 'Recent Orders'}
            </h2>
            {customer.orders && customer.orders.length > 0 ? (
              <div className="space-y-4">
                {customer.orders.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-navy-900">
                        {dict.account?.dashboard?.orderNumber || 'Order'} #{order.orderNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.processedAt).toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US')}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">
                          {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode, locale)}
                        </span>
                        {' • '}
                        <span className="text-muted-foreground">
                          {order.lineItems.edges.length} {dict.account?.dashboard?.items || 'items'}
                        </span>
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        order.fulfillmentStatus === 'FULFILLED' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.fulfillmentStatus || 'Processing'}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/${locale}/account/orders/${order.id.split('/').pop()}`}>
                          {dict.account?.dashboard?.viewDetails || 'View Details'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {dict.account?.dashboard?.noOrders || 'No orders yet'}
                </p>
                <Button asChild>
                  <Link href={`/${locale}/products`}>
                    {dict.account?.dashboard?.startShopping || 'Start Shopping'}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
