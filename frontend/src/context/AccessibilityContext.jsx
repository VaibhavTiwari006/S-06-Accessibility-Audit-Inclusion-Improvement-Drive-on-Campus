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

  const [colorBlindTheme, setColorBlindTheme] = useState(() => {
    return localStorage.getItem('access_colorBlindTheme') || 'default';
  });

  const [distractionFree, setDistractionFree] = useState(() => {
    return localStorage.getItem('access_distractionFree') === 'true';
  });

  const [magnifyMode, setMagnifyMode] = useState(() => {
    return localStorage.getItem('access_magnifyMode') === 'true';
  });

  const [visualAlerts, setVisualAlerts] = useState(() => {
    return localStorage.getItem('access_visualAlerts') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('access_darkMode') === 'true';
  });

  const [textToSpeech, setTextToSpeech] = useState(() => {
    return localStorage.getItem('access_textToSpeech') === 'true';
  });

  const [ttsVoice, setTtsVoice] = useState(() => {
    return localStorage.getItem('access_ttsVoice') || 'default';
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

  useEffect(() => {
    localStorage.setItem('access_colorBlindTheme', colorBlindTheme);
    document.body.setAttribute('data-color-blind', colorBlindTheme);
  }, [colorBlindTheme]);

  useEffect(() => {
    localStorage.setItem('access_distractionFree', distractionFree);
  }, [distractionFree]);

  useEffect(() => {
    localStorage.setItem('access_magnifyMode', magnifyMode);
    if (magnifyMode) {
      document.body.classList.add('magnify-mode');
    } else {
      document.body.classList.remove('magnify-mode');
    }
  }, [magnifyMode]);

  useEffect(() => {
    localStorage.setItem('access_visualAlerts', visualAlerts);
  }, [visualAlerts]);

  useEffect(() => {
    localStorage.setItem('access_darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('access_textToSpeech', textToSpeech);
    if (!textToSpeech) {
      window.speechSynthesis?.cancel();
    }
  }, [textToSpeech]);

  useEffect(() => {
    localStorage.setItem('access_ttsVoice', ttsVoice);
  }, [ttsVoice]);

  const speak = (text) => {
    if (!textToSpeech || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to set voice if not default
    if (ttsVoice !== 'default') {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a match, either by name or just using a different index as fallback
      const selectedVoice = voices.find(v => v.name === ttsVoice) || voices[0];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    // Slight adjustments for better screen reader experience
    utterance.rate = 1.0; 
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const changeFontSize = (size) => setFontSize(size);
  const toggleDyslexiaFont = () => setDyslexiaFont(!dyslexiaFont);
  const toggleReduceMotion = () => setReduceMotion(!reduceMotion);
  const changeColorBlindTheme = (theme) => setColorBlindTheme(theme);
  const toggleDistractionFree = () => setDistractionFree(!distractionFree);
  const toggleMagnifyMode = () => setMagnifyMode(!magnifyMode);
  const toggleVisualAlerts = () => setVisualAlerts(!visualAlerts);
  const toggleTextToSpeech = () => setTextToSpeech(!textToSpeech);
  const changeTtsVoice = (voice) => setTtsVoice(voice);

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, toggleHighContrast, 
      fontSize, changeFontSize, 
      dyslexiaFont, toggleDyslexiaFont,
      reduceMotion, toggleReduceMotion,
      colorBlindTheme, changeColorBlindTheme,
      distractionFree, toggleDistractionFree,
      magnifyMode, toggleMagnifyMode,
      visualAlerts, toggleVisualAlerts,
      darkMode, setDarkMode,
      textToSpeech, toggleTextToSpeech,
      ttsVoice, changeTtsVoice,
      speak
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
