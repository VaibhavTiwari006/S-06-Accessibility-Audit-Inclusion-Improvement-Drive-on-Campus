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

  const [dyslexiaFont, setDyslexiaFont] = useState(() => {
    return localStorage.getItem('access_dyslexiaFont') === 'true';
  });

  const [reduceMotion, setReduceMotion] = useState(() => {
    return localStorage.getItem('access_reduceMotion') === 'true';
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

  useEffect(() => {
    localStorage.setItem('access_dyslexiaFont', dyslexiaFont);
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  useEffect(() => {
    localStorage.setItem('access_reduceMotion', reduceMotion);
    if (reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const changeFontSize = (size) => setFontSize(size);
  const toggleDyslexiaFont = () => setDyslexiaFont(!dyslexiaFont);
  const toggleReduceMotion = () => setReduceMotion(!reduceMotion);

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, toggleHighContrast, 
      fontSize, changeFontSize, 
      dyslexiaFont, toggleDyslexiaFont,
      reduceMotion, toggleReduceMotion 
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
