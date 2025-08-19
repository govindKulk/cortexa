import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import "../global.css";

import StackHeader from '@/components/StackHeader';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const paperTheme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;


  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <SafeAreaView
          className={`flex-1 w-full ${Platform.OS === 'web' && 'max-w-screen-sm mx-auto'}`}
        >
          <Stack screenOptions={{
            header: (props) => <StackHeader options={props.options as {title: string}} />,
          }} >
            <Stack.Screen name="index" options={{
              headerShown: false
            }} />
            <Stack.Screen name="+not-found" />
          </Stack>

        </SafeAreaView>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
