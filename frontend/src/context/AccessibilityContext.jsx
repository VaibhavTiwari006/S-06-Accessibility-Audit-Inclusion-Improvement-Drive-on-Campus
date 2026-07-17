import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('access_highContrast') === 'true';
  });
  
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('access_fontSize') || 'Medium';
  });

  useEffect(() => {
    localStorage.setItem('access_highContrast', highContrast);
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('access_fontSize', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize.toLowerCase());
  }, [fontSize]);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const changeFontSize = (size) => setFontSize(size);

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, fontSize, changeFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
