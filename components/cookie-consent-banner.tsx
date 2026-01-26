'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

interface CookieConsentBannerProps {
  dict: any;
}

export function CookieConsentBanner({ dict }: CookieConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-500">
      <div className="mx-4 mb-4 md:mx-6 md:mb-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-navy-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-gold-600 dark:text-gold-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                    {dict.cookies.banner.title || 'Cookie Settings'}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {dict.cookies.banner.message}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleAccept} 
                    className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    {dict.cookies.banner.acceptAll}
                  </button>
                  <button 
                    onClick={handleReject} 
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-500 font-semibold rounded-lg hover:scale-105 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                  >
                    {dict.cookies.banner.rejectNonEssential}
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleReject}
                className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
