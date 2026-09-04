'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96500000000';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-20"
          style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite 0.5s' }}
        />
        <MessageCircle size={26} className="text-white relative z-10 fill-white" />
      </div>
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-xs font-medium px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
