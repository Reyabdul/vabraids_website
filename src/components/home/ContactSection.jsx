import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';
import { InquiryForm } from '@/components/contact/InquiryForm';

/**
 * Contact section — Re-Up booking is the primary CTA, the inquiry form
 * is secondary. Includes the required hair disclaimer.
 */
export function ContactSection({ content, bookingUrl, bookingLabel, hairDisclaimer, services, servicesContent }) {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 md:px-10 py-26 md:py-24 text-paper"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-[1180px] mx-auto w-full">
        <Reveal>
          <Eyebrow tone="inverted" className="mb-6">
            {content?.eyebrow}
          </Eyebrow>
          <SectionHeading variant="display" className="mb-7 whitespace-pre-line">
            {content?.headline}
          </SectionHeading>
          <p className="text-base leading-[1.85] text-paper/75 max-w-[40ch] mb-9 font-light">
            {content?.introText}
          </p>
          {bookingUrl && (
            <CtaLink href={bookingUrl} variant="filled" size="md" raised>
              {bookingLabel}
            </CtaLink>
          )}
          {hairDisclaimer && (
            <p className="text-[13px] leading-[1.7] text-paper/55 font-light max-w-[40ch] mt-9">
              {hairDisclaimer}
            </p>
          )}
        </Reveal>
        <Reveal delay={0.15}>
          <InquiryForm content={content} services={services} servicesContent={servicesContent} />
        </Reveal>
      </div>
    </section>
  );
}

ContactSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    introText: PropTypes.string,
  }),
  bookingUrl: PropTypes.string,
  bookingLabel: PropTypes.string,
  hairDisclaimer: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.object),
  servicesContent: PropTypes.shape({ menuSectionLabels: PropTypes.object }),
};
