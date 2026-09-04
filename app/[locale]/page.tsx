import HeroSection from '@/components/home/HeroSection';
import AboutStrip from '@/components/home/AboutStrip';
import ServicesSection from '@/components/home/ServicesSection';
import CollectionSection from '@/components/home/CollectionSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaBanner from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutStrip />
      <ServicesSection />
      <CollectionSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
