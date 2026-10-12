'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
import { BackToTopButton } from './BackToTopButton';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { GallerySection } from './GallerySection';
import { InstagramSection } from './InstagramSection';
import { VoicesSection } from './VoicesSection';
import { FaqSection } from './FaqSection';
import { ContactSection } from './ContactSection';
import { GalleryOverlay } from '@/components/gallery/GalleryOverlay';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';

// Scroll near the bottom of a section before the fixed footer reveals itself.
const FOOTER_REVEAL_THRESHOLD_PX = 30;

// Fixed header height — used to sample which section sits directly behind it.
const HEADER_HEIGHT_PX = 68;

// How far above the bottom of the viewport the back-to-top button's
// centre sits — used to sample which section is directly behind it.
const BACK_TO_TOP_SAMPLE_OFFSET_PX = 50;

// The splash/intro overlay dismisses on click/scroll, but also auto-dismisses
// after this long so a visitor who just waits still reaches the site.
const SPLASH_AUTO_DISMISS_MS = 3000;

// Background tone of each section, so the fixed header can swap its text
// color and stay readable over both light sections and dark ones
// (Gallery/Contact use a solid dark background). Hero is 'split': a light
// text panel beside the video, which the header paints in two tones.
const SECTION_TONE = {
  hero: 'split',
  about: 'light',
  services: 'light',
  gallery: 'dark',
  instagram: 'light',
  voices: 'light',
  faq: 'light',
  contact: 'dark',
};
const SECTION_IDS = Object.keys(SECTION_TONE);

// Flat background color behind each section, cycling through a small
// 3-color earth-tone set (ivory/linen plus one dark) instead of a unique
// shade per section — keeps the palette restrained while still alternating
// section to section. Hero's text panel is transparent, so its entry here
// is what shows behind the headline from lg up (below lg the video covers
// it). It has to stay equal to --color-paper: the splash is that color,
// and its curtain exit relies on the two being indistinguishable.
const SECTION_BG = {
  hero: '#f3f0ea', // paper
  about: '#f3eee1', // ivory
  services: '#efe6d3', // linen
  gallery: '#201a15', // dark
  instagram: '#efe6d3', // linen
  voices: '#f3eee1', // ivory
  faq: '#efe6d3', // linen
  contact: '#201a15', // dark
};

// How many px of scroll, right before a section boundary crosses the
// header line, the background spends blending into the next section's
// color. Outside that window the color is flat (no blending).
const BG_BLEND_ZONE_PX = 220;

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function mixColors(hexA, hexB, progress) {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);
  return `rgb(${r} ${g} ${b})`;
}

// Samples which section sits behind the header and derives both the
// header tone and the shared background color from it in a single pass —
// one getBoundingClientRect() per section instead of two separate loops
// each re-reading layout. Background is computed here (not via a CSS
// `transition`) so it can be applied directly with no raciness when
// swapped rapidly on scroll (see the header CTA color fix).
//
// The same pass also finds the section behind the back-to-top button
// (bottom of the viewport), which is usually a different one from the
// section behind the header. `backToTopTone` is null while that section
// is still the hero, i.e. the button only shows once About has scrolled
// up to it.
function getScrollState(viewportHeight) {
  const buttonY = viewportHeight - BACK_TO_TOP_SAMPLE_OFFSET_PX;
  let tone = SECTION_TONE.hero;
  let bgColor = SECTION_BG.hero;
  let backToTopTone = null;

  for (let i = 0; i < SECTION_IDS.length; i++) {
    const id = SECTION_IDS[i];
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= HEADER_HEIGHT_PX && rect.bottom > HEADER_HEIGHT_PX) {
      const nextId = SECTION_IDS[i + 1];
      const distanceToBoundary = rect.bottom - HEADER_HEIGHT_PX;
      tone = SECTION_TONE[id];
      bgColor = SECTION_BG[id];
      if (nextId && distanceToBoundary < BG_BLEND_ZONE_PX) {
        const progress = 1 - distanceToBoundary / BG_BLEND_ZONE_PX;
        bgColor = mixColors(SECTION_BG[id], SECTION_BG[nextId], Math.min(1, Math.max(0, progress)));
      }
    }
    if (id !== 'hero' && rect.top <= buttonY && rect.bottom > buttonY) {
      backToTopTone = SECTION_TONE[id];
    }
  }
  return { tone, bgColor, backToTopTone };
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
  // The gallery photo open in the lightbox (null = closed). Held here so
  // the preview grid and the full gallery overlay share one lightbox.
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);
  const [headerTone, setHeaderTone] = useState(SECTION_TONE.hero);
  const [bgColor, setBgColor] = useState(SECTION_BG.hero);
  // null = hidden (still on the hero); otherwise the tone to paint it in.
  const [backToTopTone, setBackToTopTone] = useState(null);
  const mainRef = useRef(null);
  const scrollTickingRef = useRef(false);

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

  useEffect(() => {
    const timer = setTimeout(enter, SPLASH_AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [enter]);

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

  // The heavy work here (layout reads + 3 state updates) ran on every raw
  // 'scroll' event, which fires far more often than the screen repaints —
  // that's what made scrolling feel stiff. Coalescing it to one
  // requestAnimationFrame per tick caps it at the display's own rate.
  const handleScroll = useCallback(() => {
    if (scrollTickingRef.current) return;
    scrollTickingRef.current = true;
    requestAnimationFrame(() => {
      scrollTickingRef.current = false;
      const el = mainRef.current;
      if (!el) return;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - FOOTER_REVEAL_THRESHOLD_PX;
      const { tone, bgColor: nextBgColor, backToTopTone: nextBackToTopTone } = getScrollState(el.clientHeight);
      setFooterVisible(nearBottom);
      setHeaderTone(tone);
      setBgColor(nextBgColor);
      setBackToTopTone(nextBackToTopTone);
    });
  }, []);

  return (
    // h-dvh (not h-screen): on phones 100vh includes the area under the
    // browser toolbar, which would push the bottom of each screen out of view.
    <div className="relative h-dvh w-full overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 -z-10" style={{ backgroundColor: bgColor }} />

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
        className="no-scrollbar h-dvh overflow-y-scroll relative"
      >
        <HeroSection
          content={heroContent}
          bookingUrl={siteSettings?.bookingUrl}
          bookingLabel={siteSettings?.bookingCtaLabel}
          onViewServices={() => goTo('services')}
          revealed={!intro}
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
          onSelectImage={setLightboxPhoto}
        />
        <InstagramSection content={instagramContent} instagramHandle={siteSettings?.instagramHandle} />
        <VoicesSection content={voicesContent} testimonials={testimonials} />
        <FaqSection content={faqContent} faqs={faqs} />
        <ContactSection
          content={contactContent}
          bookingUrl={siteSettings?.bookingUrl}
          bookingLabel={siteSettings?.bookingCtaLabel}
          hairDisclaimer={siteSettings?.hairDisclaimer}
          services={services}
          servicesContent={servicesContent}
        />
      </main>

      <SiteFooter siteSettings={siteSettings} visible={footerVisible} />

      <AnimatePresence>
        {backToTopTone && (
          <BackToTopButton tone={backToTopTone} raised={footerVisible} onClick={() => goTo('hero')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryOpen && (
          <GalleryOverlay
            content={galleryContent}
            images={galleryImages}
            instagramHandle={siteSettings?.instagramHandle}
            onClose={() => setGalleryOpen(false)}
            onSelectImage={setLightboxPhoto}
          />
        )}
      </AnimatePresence>

      {/* After the overlay so it stacks above it when opened from there. */}
      <AnimatePresence>
        {lightboxPhoto && (
          <GalleryLightbox
            photo={lightboxPhoto}
            closeLabel={galleryContent?.closeLabel}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
