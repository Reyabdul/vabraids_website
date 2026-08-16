'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';

/**
 * Fixed footer that slides up once the visitor nears the bottom of
 * whichever section they've scrolled to.
 */
export function SiteFooter({ siteSettings, visible }) {
  return (
    <motion.footer
      initial={false}
      animate={{ y: visible ? 0 : '100%', opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 inset-x-0 h-11 z-40 flex items-center justify-between gap-4 px-6 md:px-10 bg-paper/90 backdrop-blur-md border-t border-ink/12 text-[11px] tracking-[.16em] uppercase text-muted-2"
    >
      <span>{siteSettings?.footerCopyrightText}</span>
      <span className="hidden md:inline">{siteSettings?.studioAddress}</span>
      {siteSettings?.instagramHandle && (
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-2"
        >
          @{siteSettings.instagramHandle}
        </a>
      )}
    </motion.footer>
  );
}

SiteFooter.propTypes = {
  siteSettings: PropTypes.shape({
    footerCopyrightText: PropTypes.string,
    studioAddress: PropTypes.string,
    instagramHandle: PropTypes.string,
  }),
  visible: PropTypes.bool,
};
