import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Multilingual Speech Translator
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Icon 
            name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/translator_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.subtitle, { color: colors.textLight }]}>
        Speak, Translate, and Connect Across Languages
      </Text>

      <View style={styles.featuresContainer}>
        <View style={[styles.featureItem, { backgroundColor: colors.surface }]}>
          <Icon name="microphone" size={32} color={colors.primary} />
          <Text style={[styles.featureTitle, { color: colors.text }]}>
            Speech Recognition
          </Text>
          <Text style={[styles.featureDescription, { color: colors.textLight }]}>
            Speak naturally in your language and get accurate transcription.
          </Text>
        </View>

        <View style={[styles.featureItem, { backgroundColor: colors.surface }]}>
          <Icon name="translate" size={32} color={colors.secondary} />
          <Text style={[styles.featureTitle, { color: colors.text }]}>
            Fast Translation
          </Text>
          <Text style={[styles.featureDescription, { color: colors.textLight }]}>
            Translate between English, Hindi, Marathi, and Arabic.
          </Text>
        </View>

        <View style={[styles.featureItem, { backgroundColor: colors.surface }]}>
          <Icon name="account-voice" size={32} color={colors.accent} />
          <Text style={[styles.featureTitle, { color: colors.text }]}>
            Text-to-Speech
          </Text>
          <Text style={[styles.featureDescription, { color: colors.textLight }]}>
            Natural sounding voice output in target language.
          </Text>
        </View>
      </View>

      <View style={styles.startButtonContainer}>
        <CustomButton
          title="Start Translating"
          size="large"
          icon={<Icon name="translate" size={20} color="#FFFFFF" style={styles.buttonIcon} />}
          onPress={() => navigation.navigate('Translation')}
        />
      </View>

      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[styles.settingsText, { color: colors.primary }]}>Settings</Text>
        <Icon name="cog" size={16} color={colors.primary} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  themeToggle: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  startButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default HomeScreen; 