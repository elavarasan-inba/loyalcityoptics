import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Loyal City Optics | Optical Shop Salmiya Kuwait — Saba Street',
  description: 'Visit Loyal City Optics at Saba Street #118, Block 10, Salmiya, Kuwait (near Edee Super Market). Call +965 2562 0966 or WhatsApp +965 6960 2959. Open Sat–Thu 9am–9:30pm.',
  keywords: 'loyal city optics location, optical shop Saba Street Salmiya, glasses shop near me Kuwait, contact optician Salmiya, عنوان محل نظارات السالمية',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
