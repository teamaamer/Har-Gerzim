'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Locale } from '@/lib/i18n/config';

interface ContactFormProps {
  locale: Locale;
  dict: any;
}

export function ContactForm({ locale, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <div className="space-y-2">
        <Label htmlFor="name">{dict.contact.form.name}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{dict.contact.form.phone}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{dict.contact.form.message}</Label>
        <Textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? dict.contact.form.sending : dict.contact.form.send}
      </Button>

      {status === 'success' && (
        <p className="text-green-600 text-center">{dict.contact.form.success}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center">{dict.contact.form.error}</p>
      )}
    </form>
  );
}
