'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useSiteSettings } from '@/lib/query/hooks/useSiteSettings';
import { useSplashContent } from '@/lib/query/hooks/useSplashContent';
import { useHeroContent } from '@/lib/query/hooks/useHeroContent';
import { useAboutContent } from '@/lib/query/hooks/useAboutContent';
import { useServicesContent } from '@/lib/query/hooks/useServicesContent';
import { useServices } from '@/lib/query/hooks/useServices';
import { useGalleryContent } from '@/lib/query/hooks/useGalleryContent';
import { useFeaturedGalleryImages } from '@/lib/query/hooks/useFeaturedGalleryImages';
import { useGalleryImages } from '@/lib/query/hooks/useGalleryImages';
import { useInstagramContent } from '@/lib/query/hooks/useInstagramContent';
import { useVoicesContent } from '@/lib/query/hooks/useVoicesContent';
import { useTestimonials } from '@/lib/query/hooks/useTestimonials';
import { useFaqContent } from '@/lib/query/hooks/useFaqContent';
import { useFaqs } from '@/lib/query/hooks/useFaqs';
import { useContactContent } from '@/lib/query/hooks/useContactContent';

import { SplashIntro } from './SplashIntro';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { GallerySection } from './GallerySection';
import { InstagramSection } from './InstagramSection';
import { VoicesSection } from './VoicesSection';
import { FaqSection } from './FaqSection';
import { ContactSection } from './ContactSection';
import { GalleryOverlay } from '@/components/gallery/GalleryOverlay';

// Scroll near the bottom of a section before the fixed footer reveals itself.
const FOOTER_REVEAL_THRESHOLD_PX = 30;

// Fixed header height — used to sample which section sits directly behind it.
const HEADER_HEIGHT_PX = 68;

// Background tone of each section, so the fixed header can swap its text
// color and stay readable over both light sections and dark ones
// (Gallery/Contact use a solid dark background).
const SECTION_TONE = {
  hero: 'dark',
  about: 'light',
  services: 'light',
  gallery: 'dark',
  instagram: 'light',
  voices: 'light',
  faq: 'light',
  contact: 'dark',
};
const SECTION_IDS = Object.keys(SECTION_TONE);

function getSectionToneAtHeader() {
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= HEADER_HEIGHT_PX && rect.bottom > HEADER_HEIGHT_PX) {
      return SECTION_TONE[id];
    }
  }
  return SECTION_TONE.hero;
}

/**
 * Owns the cross-section experience: the splash intro, scroll-snap
 * navigation between sections, the fixed footer's scroll-triggered
 * reveal, and the full gallery overlay. Every section below just reads
 * its own content via a TanStack Query hook.
 */
export function HomeExperience() {
  const [intro, setIntro] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [headerTone, setHeaderTone] = useState(SECTION_TONE.hero);
  const mainRef = useRef(null);

  const { data: siteSettings } = useSiteSettings();
  const { data: splashContent } = useSplashContent();
  const { data: heroContent } = useHeroContent();
  const { data: aboutContent } = useAboutContent();
  const { data: servicesContent } = useServicesContent();
  const { data: services } = useServices();
  const { data: galleryContent } = useGalleryContent();
  const { data: featuredGalleryImages } = useFeaturedGalleryImages();
  const { data: galleryImages } = useGalleryImages();
  const { data: instagramContent } = useInstagramContent();
  const { data: voicesContent } = useVoicesContent();
  const { data: testimonials } = useTestimonials();
  const { data: faqContent } = useFaqContent();
  const { data: faqs } = useFaqs();
  const { data: contactContent } = useContactContent();

  const enter = useCallback(() => {
    setIntro((wasIntro) => {
      if (!wasIntro) return wasIntro;
      requestAnimationFrame(() => mainRef.current?.scrollTo({ top: 0 }));
      return false;
    });
  }, []);

  const goTo = useCallback(
    (id) => {
      enter();
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    },
    [enter]
  );

  const handleScroll = useCallback((e) => {
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - FOOTER_REVEAL_THRESHOLD_PX;
    setFooterVisible(nearBottom);
    setHeaderTone(getSectionToneAtHeader());
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-paper">
      <AnimatePresence>
        {intro && (
          <SplashIntro
            businessName={siteSettings?.businessName}
            tagline={siteSettings?.tagline}
            scrollPromptLabel={splashContent?.scrollPromptLabel}
            onEnter={enter}
          />
        )}
      </AnimatePresence>

      <SiteHeader siteSettings={siteSettings} onNavigate={goTo} tone={headerTone} />

      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="no-scrollbar h-screen overflow-y-scroll snap-y snap-proximity relative"
      >
        <HeroSection
          content={heroContent}
          bookingUrl={siteSettings?.bookingUrl}
          bookingLabel={siteSettings?.bookingCtaLabel}
          onViewServices={() => goTo('services')}
        />
        <AboutSection content={aboutContent} />
        <ServicesSection
          content={servicesContent}
          services={services}
          hairDisclaimer={siteSettings?.hairDisclaimer}
        />
        <GallerySection
          content={galleryContent}
          images={featuredGalleryImages}
          onOpenFullGallery={() => setGalleryOpen(true)}
        />
        <InstagramSection content={instagramContent} instagramHandle={siteSettings?.instagramHandle} />
        <VoicesSection content={voicesContent} testimonials={testimonials} />
        <FaqSection content={faqContent} faqs={faqs} />
        <ContactSection
          content={contactContent}
          bookingUrl={siteSettings?.bookingUrl}
          bookingLabel={siteSettings?.bookingCtaLabel}
          hairDisclaimer={siteSettings?.hairDisclaimer}
        />
      </main>

      <SiteFooter siteSettings={siteSettings} visible={footerVisible} />

      <AnimatePresence>
        {galleryOpen && (
          <GalleryOverlay
            content={galleryContent}
            images={galleryImages}
            instagramHandle={siteSettings?.instagramHandle}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
