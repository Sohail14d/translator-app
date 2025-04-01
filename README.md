# Multilingual Speech Translator

A modern mobile application for real-time speech translation designed for tourists and international communication.

## Features

- **Speech Recognition**: Record speech in your native language
- **Translation**: Translate between English, Hindi, Marathi, and Arabic
- **Text-to-Speech**: Listen to translations in the target language
- **Modern UI**: Clean, intuitive interface with animations and visual feedback
- **Dark Mode**: Full support for both light and dark themes
- **Language Selection**: Easy language switching with flag indicators
- **Customizable Settings**: Adjust speech rate and behavior preferences

## Technology Stack

- **React Native**: Cross-platform mobile framework
- **React Native Voice**: For speech recognition
- **React Native TTS**: For text-to-speech functionality
- **Axios**: For API requests to translation services
- **React Navigation**: For screen navigation
- **React Native Vector Icons**: For UI icons
- **React Native Reanimated**: For smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/translator-app.git
cd translator-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Add your translation API key
- Open `src/services/TranslationService.js`
- Replace `YOUR_TRANSLATION_API_KEY` with your actual Google Cloud Translation API key or similar service

4. Run the application
```bash
# For Android
npm run android
# or
yarn android

# For iOS
npm run ios
# or
yarn ios
```

## Project Structure

```
translator_app/
├── src/
│   ├── assets/           # Images, fonts, and other static assets
│   ├── components/       # Reusable UI components
│   ├── screens/          # Application screens
│   ├── services/         # API services and utilities for translation, STT, TTS
│   ├── utils/            # Utility functions and context providers
│   └── App.js            # Main application component
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Cloud Translation API
- React Native community
- All contributors and supporters 