'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AgeGateModal } from './age-gate-modal';
import type { Locale } from '@/lib/i18n/config';

interface AgeGateContextType {
  isVerified: boolean;
  setVerified: (verified: boolean) => void;
}

const AgeGateContext = createContext<AgeGateContextType | undefined>(undefined);

const AGE_GATE_COOKIE = 'age_verified';
const COOKIE_EXPIRY_DAYS = 30;

export function AgeGateProvider({ children, locale, dict }: { children: ReactNode; locale: Locale; dict: any }) {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_GATE_COOKIE);
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      setShowModal(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerify = (verified: boolean) => {
    if (verified) {
      localStorage.setItem(AGE_GATE_COOKIE, 'true');
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
      document.cookie = `${AGE_GATE_COOKIE}=true; expires=${expiryDate.toUTCString()}; path=/`;
      setIsVerified(true);
      setShowModal(false);
    } else {
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
