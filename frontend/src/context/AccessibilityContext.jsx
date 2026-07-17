import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('access_highContrast');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('access_highContrast', highContrast);
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast(!highContrast);

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
