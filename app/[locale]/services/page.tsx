'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Eye, Glasses, Microscope, Sun, Baby, Wrench, CheckCircle, MessageCircle
} from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96569602959';

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Eye,
    title: 'Comprehensive Eye Examination',
    desc: 'Our certified optometrists perform thorough eye examinations using the latest diagnostic technology.',
    items: [
      'Visual acuity testing',
      'Refraction & prescription update',
      'Eye pressure measurement',
      'Retinal health assessment',
      'Colour vision testing',
    ],
    duration: '30–45 minutes',
  },
  {
    icon: Glasses,
    title: 'Prescription Glasses',
    desc: 'We offer all types of prescription lenses to suit your vision needs and lifestyle.',
    items: [
      'Single vision lenses',
      'Bifocal lenses',
      'Progressive (varifocal) lenses',
      'Blue light blocking lenses',
      'Photochromic (transition) lenses',
    ],
  },
  {
    icon: Microscope,
    title: 'Contact Lenses',
    desc: 'A wide range of contact lenses for all prescriptions, fitted by our specialists.',
    items: [
      'Daily disposable contacts',
      'Monthly disposable contacts',
      'Coloured contact lenses',
      'Toric lenses for astigmatism',
      'Speciality & extended wear',
    ],
  },
  {
    icon: Sun,
    title: 'Sunglasses',
    desc: 'Premium sunwear for every occasion — fashion, sport, or everyday protection.',
    items: [
      'Prescription sunglasses',
      '100% UV protection',
      'Polarized lenses',
      'Sports & wraparound styles',
      'Photochromic sunglasses',
    ],
  },
  {
    icon: Wrench,
    title: 'Frame Fitting & Repairs',
    desc: 'Expert adjustments and repairs to keep your eyewear comfortable and looking great.',
    items: [
      'Free frame adjustments',
      'Nose pad replacement',
      'Temple & hinge repair',
      'Lens replacement',
      'Frame cleaning & polishing',
    ],
  },
  {
    icon: Baby,
    title: "Children’s Eyewear",
    desc: "Specialised eyewear for kids — durable, comfortable, and fun.",
    items: [
      'Flexible, impact-resistant frames',
      'Lightweight lens materials',
      'Fun colours and styles',
      'Sports-safe options',
      'Regular check-up reminders',
    ],
  },
];

export default function ServicesPage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a] to-navy" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">Our Services</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive optical care for the whole family — delivered by Kuwait&apos;s most trusted opticians since 1998.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, items, duration }, i) => (
            <Section key={title} delay={i * 0.08}>
              <div className="bg-dark-card border border-white/5 hover:border-gold/30 p-8 rounded-sm h-full group transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center mb-6 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-3 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                {duration && (
                  <span className="inline-block text-xs text-gold/70 border border-gold/30 px-3 py-1 rounded-full mb-3">
                    ⏱ {duration}
                  </span>
                )}
                <p className="text-white/50 text-sm mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle size={14} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060e1a] text-center">
        <Section>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Ready to Start?</p>
          <h2 className="font-playfair text-4xl text-white mb-6">Book Your Appointment</h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto">
            Call us, WhatsApp, or fill out our quick booking form.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-sm hover:bg-[#1da851] transition-colors text-sm tracking-wide"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <Link
              href={`/${locale}/book`}
              className="btn-outline-gold text-sm tracking-widest uppercase px-8 py-4"
            >
              Book Online
            </Link>
          </div>
        </Section>
      </section>
    </div>
  );
}
