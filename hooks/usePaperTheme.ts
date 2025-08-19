import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useColorScheme } from "./useColorScheme";

// Custom themes
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3b82f6',
    primaryContainer: '#dbeafe',
    secondary: '#6b7280',
    surface: '#ffffff',
    background: '#f9fafb',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#60a5fa',
    primaryContainer: '#1e40af',
    secondary: '#9ca3af',
    surface: '#374151',
    background: '#111827',
  },
};

const usePaperTheme = () => {
    const colorScheme = useColorScheme();
    return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export default usePaperTheme;
