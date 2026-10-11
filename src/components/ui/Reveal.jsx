'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const TRANSITION = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

/**
 * Fades + slides content up into place the first time it scrolls into
 * view. Used to give text blocks and images a "reveal" as the visitor
 * scrolls down the page, instead of everything being visible up front.
 * `once: true` means it never re-triggers on scroll back up.
 */
export function Reveal({ children, className = '', delay = 0, y = 28, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...TRANSITION, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  delay: PropTypes.number,
  y: PropTypes.number,
  style: PropTypes.object,
};
