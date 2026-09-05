import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eyewear Gallery | Frames & Sunglasses Collection — Loyal City Optics Kuwait',
  description: 'Browse our collection of 500+ premium eyewear frames and sunglasses in Salmiya, Kuwait. Men, women, kids and unisex styles from top international brands.',
  keywords: 'eyewear Kuwait, glasses frames Salmiya, sunglasses Kuwait, designer frames Kuwait, نظارات شمسية الكويت, إطارات نظارات السالمية',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
