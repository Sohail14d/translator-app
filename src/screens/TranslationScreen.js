import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import CustomButton from '../components/CustomButton';
import LanguageSelector from '../components/LanguageSelector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as TranslationService from '../services/TranslationService';

const TranslationScreen = () => {
  const { colors } = useTheme();

  // State variables
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, listening, processing, done
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  
  // Handle language swap
  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setResults('');
    setTranslatedText('');
  };

  // Set up speech recognition handlers
  const onSpeechStart = () => {
    console.log('Speech started');
    setResults('');
    setTranslatedText('');
  };

  const onSpeechResults = (event) => {
    const result = event.value[0] || '';
    setResults(result);
  };

  const onSpeechError = (error) => {
    console.error('Speech recognition error', error);
    setIsListening(false);
    setStatus('idle');
    stopPulseAnimation();
  };

  // Start recording
  const startListening = async () => {
    try {
      setIsListening(true);
      setStatus('listening');
      startPulseAnimation();
      await TranslationService.startSpeechRecognition(
        onSpeechStart,
        onSpeechResults,
        onSpeechError,
        TranslationService.getVoiceLanguageCode(sourceLanguage)
      );
    } catch (error) {
      console.error('Failed to start recording', error);
      setIsListening(false);
      setStatus('idle');
      stopPulseAnimation();
    }
  };

  // Stop recording and translate
  const stopListening = async () => {
    try {
      await TranslationService.stopSpeechRecognition();
      setIsListening(false);
      stopPulseAnimation();
      
      if (results) {
        translateResults();
      } else {
        setStatus('idle');
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
      setStatus('idle');
    }
  };

  // Translate the recognized text
  const translateResults = async () => {
    if (!results) return;
    
    setIsTranslating(true);
    setStatus('processing');
    startTranslateAnimation();
    
    try {
      const translated = await TranslationService.translateText(
        results,
        sourceLanguage,
        targetLanguage
      );
      
      setTranslatedText(translated);
      setIsTranslating(false);
      setStatus('done');
      
      // Automatically speak the translation
      speakTranslation();
    } catch (error) {
      console.error('Translation error', error);
      setIsTranslating(false);
      setStatus('idle');
    }
  };

  // Speak the translated text
  const speakTranslation = async () => {
    if (!translatedText) return;
    
    setIsSpeaking(true);
    
    try {
      await TranslationService.speakText(
        translatedText,
        TranslationService.getTtsLanguageCode(targetLanguage)
      );
      setIsSpeaking(false);
    } catch (error) {
      console.error('TTS error', error);
      setIsSpeaking(false);
    }
  };

  // Reset everything
  const resetTranslation = () => {
    setResults('');
    setTranslatedText('');
    setStatus('idle');
  };

  // Animation functions
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startTranslateAnimation = () => {
    Animated.timing(translateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Clean up voice recognition when component unmounts
  useEffect(() => {
    return () => {
      TranslationService.destroySpeechRecognition();
    };
  }, []);

  // Reset translate animation when text changes
  useEffect(() => {
    translateAnim.setValue(0);
  }, [results]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.languageSelectors}>
        <LanguageSelector
          selectedLanguage={sourceLanguage}
          onSelectLanguage={setSourceLanguage}
          label="Speak in"
        />
        
        <TouchableOpacity 
          style={styles.swapButton}
          onPress={handleSwapLanguages}
        >
          <Icon name="swap-horizontal" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <LanguageSelector
          selectedLanguage={targetLanguage}
          onSelectLanguage={setTargetLanguage}
          label="Translate to"
        />
      </View>

      <View 
        style={[
          styles.resultContainer, 
          { 
            borderColor: colors.divider,
            backgroundColor: colors.surface,
          }
        ]}
      >
        <Text style={[styles.resultLabel, { color: colors.textLight }]}>
          Original Text:
        </Text>
        
        {isListening ? (
          <Text style={[styles.listeningText, { color: colors.primary }]}>
            Listening...
          </Text>
        ) : (
          <Text style={[styles.resultText, { color: colors.text }]}>
            {results || 'Press the microphone button and start speaking'}
          </Text>
        )}
      </View>

      <View 
        style={[
          styles.translationContainer, 
          { 
            borderColor: colors.divider,
            backgroundColor: colors.surface,
          }
        ]}
      >
        <View style={styles.translationHeader}>
          <Text style={[styles.translationLabel, { color: colors.textLight }]}>
            Translation:
          </Text>
          
          {isSpeaking && (
            <Icon name="volume-high" size={20} color={colors.primary} />
          )}
        </View>
        
        {isTranslating ? (
          <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
        ) : (
          <Animated.View
            style={{
              opacity: translateAnim,
              transform: [
                {
                  translateY: translateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={[styles.translationText, { color: colors.text }]}>
              {translatedText || 'Translation will appear here'}
            </Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        {!isListening ? (
          <CustomButton
            title="Start"
            size="round"
            icon={<Icon name="microphone" size={28} color="#FFFFFF" />}
            onPress={startListening}
            style={styles.controlButton}
          />
        ) : (
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <CustomButton
              title="Stop"
              size="round"
              type="accent"
              icon={<Icon name="stop" size={28} color="#FFFFFF" />}
              onPress={stopListening}
              style={styles.controlButton}
            />
          </Animated.View>
        )}

        {status === 'done' && (
          <View style={styles.additionalControls}>
            <CustomButton
              title="Play"
              size="small"
              type="secondary"
              icon={<Icon name="volume-high" size={20} color="#FFFFFF" style={styles.buttonIcon} />}
              onPress={speakTranslation}
              disabled={isSpeaking}
              loading={isSpeaking}
              style={styles.smallButton}
            />
            
            <CustomButton
              title="Reset"
              size="small"
              type="outline"
              icon={<Icon name="refresh" size={20} color={colors.primary} style={styles.buttonIcon} />}
              onPress={resetTranslation}
              style={styles.smallButton}
            />
          </View>
        )}
      </View>

      {status === 'done' && (
        <View style={styles.statusIndicator}>
          <Icon name="check-circle" size={24} color={colors.success} style={styles.statusIcon} />
          <Text style={[styles.statusText, { color: colors.success }]}>Translation Complete</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  languageSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  swapButton: {
    padding: 12,
    margin: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginTop: 24,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    minHeight: 120,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
  listeningText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  translationContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
    minHeight: 120,
  },
  translationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  translationLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  loader: {
    marginTop: 16,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  controlButton: {
    marginBottom: 16,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smallButton: {
    marginHorizontal: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TranslationScreen; 