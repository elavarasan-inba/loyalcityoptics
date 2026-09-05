import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Optical Services in Salmiya Kuwait | Eye Exam, Glasses, Lenses — Loyal City Optics',
  description: 'Complete optical services in Salmiya, Kuwait. Eye examinations, prescription glasses, premium frames, contact lenses, and sunglasses. Walk-in welcome. Same-day lens cutting.',
  keywords: 'eye examination Kuwait, prescription glasses Salmiya, contact lenses Kuwait, optical services Kuwait, eye test Salmiya, فحص نظر الكويت, عدسات لاصقة الكويت',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
