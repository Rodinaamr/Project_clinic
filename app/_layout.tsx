import NavigationBar from "@/components/NavigationBar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import from the correct relative path
import { testBackendConnection } from "./services/api";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="patient" options={{ headerShown: false }} />
            <Stack.Screen name="doctor" options={{ headerShown: false }} />
            <Stack.Screen name="assistant" options={{ headerShown: false }} />
          </Stack>
        </View>
        
        {/* Navigation Bar */}
        <NavigationBar />
      </View>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Test backend connection when app starts
    const testConnection = async () => {
      try {
        console.log('='.repeat(60));
        console.log('🚀 STARTING BACKEND CONNECTION TEST');
        console.log('='.repeat(60));
        console.log(`📱 Platform: ${Platform.OS}`);
        
        const result = await testBackendConnection();
        
        if (result.success) {
          console.log('✅ BACKEND CONNECTION SUCCESSFUL!');
          console.log('✅ You can now use all API endpoints.');
        } else {
          console.log('❌ BACKEND CONNECTION FAILED');
          console.log(`❌ Error: ${result.error}`);
          console.log('');
          console.log('🔧 TROUBLESHOOTING:');
          console.log('1. Is Visual Studio backend running?');
          console.log('2. Open http://localhost:7078/swagger in browser');
          console.log('3. For Android: Use http://10.0.2.2:7078');
        }
        
        console.log('='.repeat(60));
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };
    
    // Run the test
    testConnection();
    
    // Hide splash screen
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});