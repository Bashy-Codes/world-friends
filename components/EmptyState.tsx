import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "@/lib/Theme";

interface EmptyStateProps {
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ style }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(20),
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="sad"
        size={scale(100)}
        color={theme.colors.error}
      />
    </View>
  );
};
