import React, { createContext, useState, useContext } from 'react';

const COLORS = {
  light: {
    primary: '#5B8FF9',
    secondary: '#61C0BF',
    accent: '#F8A170',
    background: '#FFFFFF',
    surface: '#F4F4F4',
    text: '#333333',
    textLight: '#767676',
    divider: '#E0E0E0',
    error: '#FF6B6B',
    success: '#5CC689',
    warning: '#FFC857',
  },
  dark: {
    primary: '#5B8FF9',
    secondary: '#61C0BF',
    accent: '#F8A170',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#F4F4F4',
    textLight: '#BBBBBB',
    divider: '#3E3E3E',
    error: '#FF6B6B',
    success: '#5CC689',
    warning: '#FFC857',
  },
};

const ThemeContext = createContext({
  isDark: false,
  colors: COLORS.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    colors: isDark ? COLORS.dark : COLORS.light,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 