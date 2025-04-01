import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';

const CustomButton = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  style,
}) => {
  const { colors } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  // Animated press effect
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Determine button styles based on type and size
  const getButtonStyles = () => {
    let buttonStyle = {};
    
    // Type styles
    switch (type) {
      case 'primary':
        buttonStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = colors.secondary;
        break;
      case 'accent':
        buttonStyle.backgroundColor = colors.accent;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 2;
        buttonStyle.borderColor = colors.primary;
        break;
      default:
        buttonStyle.backgroundColor = colors.primary;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.paddingVertical = 8;
        buttonStyle.paddingHorizontal = 16;
        buttonStyle.borderRadius = 8;
        break;
      case 'medium':
        buttonStyle.paddingVertical = 12;
        buttonStyle.paddingHorizontal = 24;
        buttonStyle.borderRadius = 10;
        break;
      case 'large':
        buttonStyle.paddingVertical = 16;
        buttonStyle.paddingHorizontal = 32;
        buttonStyle.borderRadius = 12;
        break;
      case 'round':
        buttonStyle.width = 60;
        buttonStyle.height = 60;
        buttonStyle.borderRadius = 30;
        buttonStyle.justifyContent = 'center';
        buttonStyle.alignItems = 'center';
        break;
      default:
        buttonStyle.paddingVertical = 12;
        buttonStyle.paddingHorizontal = 24;
        buttonStyle.borderRadius = 10;
    }
    
    // Disabled style
    if (disabled) {
      buttonStyle.opacity = 0.6;
    }
    
    return buttonStyle;
  };

  // Determine text styles based on type
  const getTextStyles = () => {
    let textStyle = {};
    
    switch (type) {
      case 'outline':
        textStyle.color = colors.primary;
        break;
      default:
        textStyle.color = '#FFFFFF';
    }
    
    switch (size) {
      case 'small':
        textStyle.fontSize = 14;
        break;
      case 'medium':
        textStyle.fontSize = 16;
        break;
      case 'large':
        textStyle.fontSize = 18;
        break;
      default:
        textStyle.fontSize = 16;
    }
    
    return textStyle;
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[
          styles.button,
          getButtonStyles(),
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            {icon}
            {title && <Text style={[styles.text, getTextStyles()]}>{title}</Text>}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomButton; 