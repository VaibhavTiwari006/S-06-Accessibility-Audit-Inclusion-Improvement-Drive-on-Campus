import { useEffect } from 'react';

/**
 * Sets the document title for accessibility (WCAG 2.4.2) and browser tab identification.
 * Appends " | CU Access Audit" suffix to all page titles.
 * 
 * @param {string} title - The page-specific title
 */
const usePageTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | CU Access Audit`;
    return () => { document.title = prev; };
  }, [title]);
};

export default usePageTitle;
