import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Loyal City Optics Salmiya — 26 Years of Excellence',
  description: 'Loyal City Optics has served Kuwait since 1998. Located in Salmiya, we offer expert eye care, premium frames and lenses. Trusted by 10,000+ customers across Kuwait.',
  keywords: 'about loyal city optics, optical shop history Kuwait, optician Salmiya Kuwait, eye care Kuwait since 1998',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
