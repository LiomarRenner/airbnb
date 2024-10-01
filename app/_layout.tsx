import React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon-b': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'mon-sb': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-l': require('@/assets/fonts/Montserrat-Light.ttf'),
    'mon-r': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'mon-m': require('@/assets/fonts/Montserrat-Medium.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)/login" 
        options={{
          title: 'Log in or sign up',
          presentation: 'modal', 
          headerTitleStyle: {
            fontFamily: 'mon-b',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}> 
              <Ionicons name="close-outline" size={28}/>
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen 
        name="(modals)/booking" 
        options={{ 
          presentation: 'transparentModal',
          animation: 'fade',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}> 
              <Ionicons name="close-outline" size={28}/>
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
    </Stack>
  );
}
