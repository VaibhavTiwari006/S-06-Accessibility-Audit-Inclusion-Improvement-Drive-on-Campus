import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';

const TextToSpeech = ({ text, ariaLabel = "Read text aloud" }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleSpeak = () => {
    if (!speechSynthesis) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis && isSpeaking) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis, isSpeaking]);

  if (!speechSynthesis) return null;

  return (
    <button
      onClick={handleSpeak}
      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
      aria-label={isSpeaking ? "Stop reading" : ariaLabel}
      title={isSpeaking ? "Stop reading" : ariaLabel}
    >
      {isSpeaking ? <Square size={16} /> : <Volume2 size={16} />}
    </button>
  );
};

export default TextToSpeech;
