import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [speechRate, setSpeechRate] = useState('0.5');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your translation history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would clear the history from AsyncStorage or another storage
            Alert.alert('Success', 'Translation history cleared');
          },
        },
      ]
    );
  };

  const handleRateApp = () => {
    // Would navigate to app store in a real app
    Linking.openURL('https://play.google.com/store');
  };

  const renderSettingItem = (icon, title, right, showBorder = true) => (
    <View
      style={[
        styles.settingItem,
        showBorder && { borderBottomWidth: 1, borderBottomColor: colors.divider },
      ]}
    >
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color={colors.primary} style={styles.settingIcon} />
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.settingRight}>{right}</View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>

      {renderSettingItem(
        isDark ? 'weather-night' : 'white-balance-sunny',
        'Dark Mode',
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primary + '80' }}
          thumbColor={isDark ? colors.primary : '#f4f3f4'}
        />
      )}

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
        Speech Settings
      </Text>

      {renderSettingItem(
        'account-voice',
        'Speech Rate',
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={speechRate}
            onValueChange={(value) => setSpeechRate(value)}
            style={styles.picker}
            dropdownIconColor={colors.text}
            mode="dropdown"
          >
            <Picker.Item label="Slow" value="0.4" />
            <Picker.Item label="Normal" value="0.5" />
            <Picker.Item label="Fast" value="0.7" />
          </Picker>
        </View>
      )}

      {renderSettingItem(
        'text-to-speech',
        'Auto-Speak Translation',
        <Switch
          value={autoSpeak}
          onValueChange={setAutoSpeak}
          trackColor={{ false: '#767577', true: colors.primary + '80' }}
          thumbColor={autoSpeak ? colors.primary : '#f4f3f4'}
        />
      )}

      {renderSettingItem(
        'message-question',
        'Show Confirmation Dialogs',
        <Switch
          value={showConfirmDialog}
          onValueChange={setShowConfirmDialog}
          trackColor={{ false: '#767577', true: colors.primary + '80' }}
          thumbColor={showConfirmDialog ? colors.primary : '#f4f3f4'}
        />
      )}

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
        Data & Privacy
      </Text>

      {renderSettingItem(
        'delete',
        'Clear Translation History',
        <TouchableOpacity onPress={handleClearHistory}>
          <Text style={[styles.actionText, { color: colors.error }]}>Clear</Text>
        </TouchableOpacity>
      )}

      {renderSettingItem(
        'security',
        'Privacy Policy',
        <Icon name="chevron-right" size={24} color={colors.textLight} />,
        false
      )}

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>About</Text>

      {renderSettingItem(
        'information',
        'App Version',
        <Text style={[styles.versionText, { color: colors.textLight }]}>1.0.0</Text>
      )}

      {renderSettingItem(
        'star',
        'Rate the App',
        <TouchableOpacity onPress={handleRateApp}>
          <Text style={[styles.actionText, { color: colors.primary }]}>Rate</Text>
        </TouchableOpacity>
      )}

      {renderSettingItem(
        'email',
        'Contact Support',
        <Icon name="chevron-right" size={24} color={colors.textLight} />,
        false
      )}
      
      <View style={styles.spacer} />
      
      <CustomButton
        title="Restore Defaults"
        type="outline"
        icon={<Icon name="restore" size={20} color={colors.primary} style={styles.buttonIcon} />}
        onPress={() => {
          // Would reset all settings to defaults
          Alert.alert('Settings Restored', 'All settings have been restored to defaults');
        }}
        style={styles.restoreButton}
      />

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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    width: 120,
  },
  picker: {
    width: '100%',
    height: 40,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 14,
  },
  spacer: {
    height: 40,
  },
  restoreButton: {
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default SettingsScreen; 