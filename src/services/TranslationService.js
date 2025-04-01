import Voice from '@react-native-community/voice';
import axios from 'axios';
import Tts from 'react-native-tts';

// You will need to replace these with your actual API keys
const TRANSLATION_API_KEY = 'YOUR_TRANSLATION_API_KEY';
const TRANSLATION_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

// Initialize TTS
export const initTTS = () => {
  Tts.setDefaultLanguage('en-US');
  Tts.setDefaultRate(0.5);
  Tts.setDefaultPitch(1.0);
};

// Speech-to-Text
export const startSpeechRecognition = (onSpeechStart, onSpeechResults, onSpeechError, language = 'en-US') => {
  // Set up voice event handlers
  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechError = onSpeechError;

  // Start speech recognition
  return Voice.start(language)
    .catch(error => {
      console.error('Error starting speech recognition:', error);
      throw error;
    });
};

export const stopSpeechRecognition = async () => {
  try {
    await Voice.stop();
    return true;
  } catch (error) {
    console.error('Error stopping speech recognition:', error);
    return false;
  }
};

export const destroySpeechRecognition = async () => {
  try {
    await Voice.destroy();
  } catch (error) {
    console.error('Error destroying speech recognition instance:', error);
  }
};

// Translation
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await axios.post(
      `${TRANSLATION_API_URL}?key=${TRANSLATION_API_KEY}`,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
};

// Text-to-Speech
export const speakText = (text, language) => {
  return new Promise((resolve, reject) => {
    // Set event listeners
    Tts.addEventListener('tts-start', () => console.log('TTS started'));
    Tts.addEventListener('tts-finish', () => {
      console.log('TTS finished');
      resolve();
    });
    Tts.addEventListener('tts-error', (err) => {
      console.error('TTS error:', err);
      reject(err);
    });

    // Set language and speak
    Tts.setDefaultLanguage(language);
    Tts.speak(text);
  });
};

// Utility to get the appropriate Voice language code
export const getVoiceLanguageCode = (langCode) => {
  const mapping = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'mr': 'mr-IN',
    'ar': 'ar-SA',
  };
  
  return mapping[langCode] || 'en-US';
};

// Utility to get the appropriate TTS language code
export const getTtsLanguageCode = (langCode) => {
  const mapping = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'mr': 'mr-IN',
    'ar': 'ar-SA',
  };
  
  return mapping[langCode] || 'en-US';
}; 