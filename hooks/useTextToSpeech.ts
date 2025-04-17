import { useEffect, useRef, useState } from "react";

type Language = 'en' | 'ar';

export const useTextToSpeech = () => {
   const synthRef = useRef<SpeechSynthesis | null>(null);
   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
   const [isSpeaking, setIsSpeaking] = useState(false);
   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

   useEffect(() => {
      if (typeof window === "undefined") return;

      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
         const allVoices = synthRef.current?.getVoices() || [];
         console.log("🔊 All Available Voices:", allVoices);
         setVoices(allVoices);
      };

      if (synthRef.current?.onvoiceschanged !== undefined) {
         synthRef.current.onvoiceschanged = loadVoices;
      }

      // Extra safeguard to ensure voices are loaded
      setTimeout(() => loadVoices(), 500);
   }, []);

   const getVoiceByLang = (lang: Language): SpeechSynthesisVoice | null => {
      const langCode = lang === "ar" ? "ar" : "en";
      const voice = voices.find((v) => v.lang.toLowerCase().startsWith(langCode));
      if (!voice) {
         console.warn(`⚠️ No voice found for language: "${lang}"`);
         console.info("✅ Tip: Check your system/browser TTS settings or try a different browser.");
      } else {
         console.log(`✅ Using voice: ${voice.name} (${voice.lang})`);
      }
      return voice || null;
   };

   const start = (text: string, language: Language = 'en') => {
      stop();
      if (!synthRef.current) {
         console.error("❌ SpeechSynthesis is not available in this browser.");
         return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';

      const voice = getVoiceByLang(language);
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
         console.log("🗣️ Speech started");
         setIsSpeaking(true);
      };
      utterance.onend = () => {
         console.log("✅ Speech ended");
         setIsSpeaking(false);
      };
      utterance.onerror = (e) => {
         console.error("❌ Speech error:", e.error);
         setIsSpeaking(false);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
   };

   const pause = () => {
      if (synthRef.current?.speaking && !synthRef.current.paused) {
         console.log("⏸️ Speech paused");
         synthRef.current.pause();
      }
   };

   const resume = () => {
      if (synthRef.current?.paused) {
         console.log("▶️ Speech resumed");
         synthRef.current.resume();
      }
   };

   const stop = () => {
      if (synthRef.current?.speaking) {
         console.log("🛑 Speech stopped");
         synthRef.current.cancel();
         setIsSpeaking(false);
      }
   };

   return { start, pause, resume, stop, isSpeaking, voices };
};
