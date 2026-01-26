'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AgeGateModal } from './age-gate-modal';
import type { Locale } from '@/lib/i18n/config';

interface AgeGateContextType {
  isVerified: boolean;
  setVerified: (verified: boolean) => void;
}

const AgeGateContext = createContext<AgeGateContextType | undefined>(undefined);

const AGE_GATE_COOKIE = 'age_verified';
const AGE_GATE_DENIED = 'age_denied';
const COOKIE_EXPIRY_DAYS = 30;

export function AgeGateProvider({ children, locale, dict }: { children: ReactNode; locale: Locale; dict: any }) {
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAgeBlockedPage = pathname?.includes('/age-blocked');
    
    if (isAgeBlockedPage) {
      setIsLoading(false);
      return;
    }

    const denied = localStorage.getItem(AGE_GATE_DENIED);
    if (denied === 'true') {
      window.location.href = `/${locale}/age-blocked`;
      return;
    }

    const verified = localStorage.getItem(AGE_GATE_COOKIE);
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      setShowModal(true);
    }
    setIsLoading(false);
  }, [locale, pathname]);

  const handleVerify = (verified: boolean) => {
    if (verified) {
      localStorage.setItem(AGE_GATE_COOKIE, 'true');
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
      document.cookie = `${AGE_GATE_COOKIE}=true; expires=${expiryDate.toUTCString()}; path=/`;
      setIsVerified(true);
      setShowModal(false);
    } else {
      localStorage.setItem(AGE_GATE_DENIED, 'true');
      setShowModal(false);
      window.location.href = `/${locale}/age-blocked`;
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AgeGateContext.Provider value={{ isVerified, setVerified: setIsVerified }}>
      {showModal && <AgeGateModal dict={dict} onVerify={handleVerify} />}
      {children}
    </AgeGateContext.Provider>
  );
}

export function useAgeGate() {
  const context = useContext(AgeGateContext);
  if (context === undefined) {
    throw new Error('useAgeGate must be used within an AgeGateProvider');
  }
  return context;
}
