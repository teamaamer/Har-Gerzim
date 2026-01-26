'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface AgeGateModalProps {
  dict: any;
  onVerify: (verified: boolean) => void;
}

export function AgeGateModal({ dict, onVerify }: AgeGateModalProps) {
  return (
    <Dialog open={true} modal={true}>
      <DialogContent 
        hideClose
        className="w-[95vw] max-w-[90vw] sm:max-w-lg border-2 border-gold-200 dark:border-gold-800 bg-white dark:bg-navy-900 mx-4" 
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/20 dark:to-gold-800/20 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-12 w-12 text-gold-600 dark:text-gold-400" />
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <DialogTitle className="text-3xl font-bold text-navy-900 dark:text-white">
              {dict.ageGate.title}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed px-4">
              {dict.ageGate.message}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 pt-6">
          <Button 
            onClick={() => onVerify(true)} 
            size="lg" 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <ShieldCheck className="mr-2 h-5 w-5" />
            {dict.ageGate.confirm}
          </Button>
          
          <Button 
            onClick={() => onVerify(false)} 
            variant="outline" 
            size="lg" 
            className="w-full h-14 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-white hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            {dict.ageGate.deny}
          </Button>
        </div>
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {dict.footer.businessName}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
