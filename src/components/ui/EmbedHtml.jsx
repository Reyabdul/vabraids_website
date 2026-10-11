'use client';

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a raw third-party embed snippet (e.g. an Instagram Reels widget's
 * `<div>` + `<script src="...">` pasted from Sanity). `dangerouslySetInnerHTML`
 * inserts `<script>` tags as inert markup — browsers only execute a script
 * element that was itself created via the DOM API — so this walks the
 * inserted nodes and re-creates each `<script>` to make the widget actually
 * boot.
 * @param {{ html: string, className?: string }} props
 */
export function EmbedHtml({ html, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('script').forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }, [html]);

  return <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

EmbedHtml.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
};
