/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Initialize TTS
import { initTTS } from './src/services/TranslationService';
initTTS();

AppRegistry.registerComponent(appName, () => App); 