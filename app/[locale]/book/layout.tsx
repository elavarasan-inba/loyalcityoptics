import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Eye Exam Appointment | Loyal City Optics Salmiya Kuwait',
  description: 'Book your eye examination or frame fitting appointment at Loyal City Optics, Salmiya Kuwait. Confirm via WhatsApp. Same-day appointments available.',
  keywords: 'book eye exam Kuwait, appointment optician Salmiya, eye test booking Kuwait, حجز موعد فحص نظر الكويت',
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
