import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  FlatList,
  Image
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { supportedLanguages } from '../services/TranslationService';

const LanguageSelector = ({ 
  selectedLanguage, 
  onSelectLanguage, 
  label 
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLang = supportedLanguages.find(lang => lang.code === selectedLanguage);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.selector,
          { 
            backgroundColor: colors.surface,
            borderColor: colors.divider
          }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedLang?.flag}</Text>
        <Text style={[styles.language, { color: colors.text }]}>
          {selectedLang?.name || 'Select Language'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View 
            style={[
              styles.modalContainer,
              { 
                backgroundColor: colors.background,
                borderColor: colors.divider
              }
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Language</Text>
            
            <FlatList
              data={supportedLanguages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    selectedLanguage === item.code && {
                      backgroundColor: colors.primary + '20', // 20% opacity
                    }
                  ]}
                  onPress={() => {
                    onSelectLanguage(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={[styles.languageName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  {selectedLanguage === item.code && (
                    <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]} />
                  )}
                </TouchableOpacity>
              )}
              style={styles.list}
            />
            
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.surface }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, { color: colors.text }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  language: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LanguageSelector; 