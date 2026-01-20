'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AgeGateModalProps {
  dict: any;
  onVerify: (verified: boolean) => void;
}

export function AgeGateModal({ dict, onVerify }: AgeGateModalProps) {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{dict.ageGate.title}</DialogTitle>
          <DialogDescription className="text-base pt-4">
            {dict.ageGate.message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={() => onVerify(true)} size="lg" className="w-full">
            {dict.ageGate.confirm}
          </Button>
          <Button onClick={() => onVerify(false)} variant="outline" size="lg" className="w-full">
            {dict.ageGate.deny}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
