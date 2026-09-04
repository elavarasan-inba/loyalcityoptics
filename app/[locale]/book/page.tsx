'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96569602959';

type FormData = {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
};

export default function BookPage() {
  const t = useTranslations('book');
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const msg = `*New Appointment Request — Loyal City Optics*

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email || 'N/A'}
📅 Date: ${data.date}
⏰ Time: ${data.time}
🔍 Service: ${data.service}
📝 Notes: ${data.notes || 'None'}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  const inputClass = 'w-full bg-dark-card border border-white/10 focus:border-gold/50 outline-none text-white placeholder-white/30 px-4 py-3 rounded-sm text-sm transition-colors duration-200';
  const labelClass = 'block text-white/60 text-xs tracking-widest uppercase mb-2';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] to-navy" />
        <div className="relative max-w-2xl mx-auto px-4">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Schedule a Visit</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">{t('title')}</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/60">{t('subtitle')}</p>
        </div>
      </div>

      <section className="py-16 max-w-2xl mx-auto px-4 sm:px-6">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-[#25D366]" />
            </div>
            <h2 className="font-playfair text-3xl text-white mb-4">Appointment Requested!</h2>
            <p className="text-white/60 mb-8">{t('success')}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-outline-gold text-sm px-8 py-3"
            >
              Book Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className={labelClass}>{t('name')} *</label>
              <input
                {...register('name', { required: true })}
                className={inputClass}
                placeholder="Your full name"
              />
              {errors.name && <p className={errorClass}>Name is required</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>{t('phone')} *</label>
              <input
                {...register('phone', { required: true })}
                className={inputClass}
                placeholder="+965 XXXX XXXX"
              />
              {errors.phone && <p className={errorClass}>Phone is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>{t('email')}</label>
              <input
                {...register('email')}
                type="email"
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>

            {/* Date */}
            <div>
              <label className={labelClass}>{t('date')}</label>
              <input
                {...register('date')}
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            {/* Time */}
            <div>
              <label className={labelClass}>{t('time')}</label>
              <div className="grid grid-cols-3 gap-3">
                {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      {...register('time')}
                      type="radio"
                      value={t(slot)}
                      className="sr-only peer"
                    />
                    <div className="border border-white/10 peer-checked:border-gold peer-checked:bg-gold/10 px-3 py-3 rounded-sm text-center text-white/50 peer-checked:text-gold text-xs transition-all duration-200 hover:border-gold/30">
                      {t(slot)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Service */}
            <div>
              <label className={labelClass}>{t('service')}</label>
              <select
                {...register('service')}
                className={`${inputClass} [&>option]:bg-dark-card`}
              >
                <option value="">{t('service')}</option>
                <option>{t('eye_exam')}</option>
                <option>{t('frame_fitting')}</option>
                <option>{t('contact_lenses')}</option>
                <option>{t('other')}</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>{t('notes')}</label>
              <textarea
                {...register('notes')}
                rows={3}
                className={inputClass}
                placeholder="Any special requests or notes..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-4 rounded-sm transition-colors duration-300 text-sm tracking-wide"
            >
              <MessageCircle size={20} />
              {t('submit')}
            </button>

            <p className="text-white/30 text-xs text-center">
              This will open WhatsApp with your booking details pre-filled.
            </p>
          </motion.form>
        )}
      </section>
    </div>
  );
}
