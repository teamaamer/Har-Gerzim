'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              {dict.cookies.banner.message}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleAccept} size="sm">
              {dict.cookies.banner.acceptAll}
            </Button>
            <Button onClick={handleReject} variant="outline" size="sm">
              {dict.cookies.banner.rejectNonEssential}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
