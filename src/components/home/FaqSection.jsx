'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqItem } from './FaqItem';

/**
 * "Good to Know" FAQ accordion — one question open at a time.
 */
export function FaqSection({ content, faqs = [] }) {
  const [openId, setOpenId] = useState(faqs[0]?._id ?? null);

  return (
    <section id="faq" className="snap-start min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-[900px] mx-auto w-full">
        <div className="text-center mb-13">
          <Eyebrow className="mb-5 text-center">{content?.eyebrow}</Eyebrow>
          <SectionHeading>{content?.heading}</SectionHeading>
        </div>
        <div className="border-t border-ink/16">
          {faqs.map((faq) => (
            <FaqItem
              key={faq._id}
              question={faq.question}
              answer={faq.answer}
              open={openId === faq._id}
              onToggle={() => setOpenId((id) => (id === faq._id ? null : faq._id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

FaqSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    heading: PropTypes.string,
  }),
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      question: PropTypes.string,
      answer: PropTypes.string,
    })
  ),
};
