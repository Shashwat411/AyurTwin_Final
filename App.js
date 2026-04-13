import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import ChatBot from './src/components/ChatBot';

// Suppress non-critical warnings in development
LogBox.ignoreLogs(['Warning:', 'Possible Unhandled']);

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <AppNavigator />
      <ChatBot />
    </AppProvider>
  );
}
