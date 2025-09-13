import "react-native-reanimated";
import "react-native-gesture-handler";

import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { Redirect } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "@/lib/Theme";
import { api } from "@/convex/_generated/api";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useEffect } from "react";

export default function Index() {
  const theme = useTheme();

    // Get current user ID for RevenueCat initialization
  const currentUserId = useQuery(api.profiles.getCurrentUserId);
  const { initializeSDK } = useRevenueCat();

  // Initialize RevenueCat when user ID is available
  useEffect(() => {
    if (currentUserId && Platform.OS !== 'web') {
      initializeSDK(currentUserId);
    }
  }, [currentUserId, initializeSDK]);

  return (
    <>
      <AuthLoading>
        <ActivityIndicator
          size={"large"}
          style={[
            styles.loadingContainer,
            { backgroundColor: theme.colors.background },
          ]}
        />
      </AuthLoading>
      <Unauthenticated>
        <Redirect href="/(auth)" />
      </Unauthenticated>
      <Authenticated>
        <Redirect href="/(tabs)" />
      </Authenticated>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
