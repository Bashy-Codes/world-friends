import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/Theme";
import { useLetter } from "@/hooks/communications/useLetter";
import { Id } from "@/convex/_generated/dataModel";
import { getCountryByCode } from "@/constants/geographics";
import { getDeliveryMessage } from "@/utils/common";
import { useTranslation } from "react-i18next";

// components
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenLoading } from "@/components/ScreenLoading";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/common/Separator";


export default function LetterDetailScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const letterId = id as Id<"letters">;

  const {
    letter,
    isLoading,
    hasError,
    handleBack,
    getTimeAgo,
  } = useLetter(letterId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: scale(16),
      paddingTop: verticalScale(16),
    },
    deliverySection: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(20),
      marginBottom: verticalScale(16),
      alignItems: "center",
      minHeight: verticalScale(120),
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
    },
    deliveryContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    deliveryIcon: {
      marginBottom: verticalScale(12),
    },
    deliveryText: {
      fontSize: moderateScale(14),
      color: theme.colors.text,
      fontWeight: "600",
      textAlign: "center",
      lineHeight: moderateScale(20),
      flexWrap: "wrap",
    },
    letterSection: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(20),
      marginBottom: verticalScale(16),
    },
    readerIcon: {
      alignSelf: "center",
      marginBottom: verticalScale(16),
    },
    letterTitle: {
      textAlign: "center",
      fontSize: moderateScale(24),
      fontWeight: "700",
      color: theme.colors.text,
      lineHeight: moderateScale(32),
    },
    letterContent: {
      fontSize: moderateScale(16),
      color: theme.colors.text,
      lineHeight: moderateScale(24),
    },
  });

  if (isLoading) {
    return <ScreenLoading onBack={handleBack} />;
  }

  if (hasError || !letter) {
    return (
      <EmptyState style={{ flex: 1 }} />
    );
  }

  // Get country information
  const country = getCountryByCode(letter.otherUser.country);


  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScreenHeader title={t("screenTitles.letter")} onBack={handleBack} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
      >
        {/* Delivery Details */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryContainer}>
            <MaterialCommunityIcons
              name={letter.isDelivered ? "truck-check" : "truck-fast"}
              size={scale(76)}
              color={letter.isDelivered ? theme.colors.success : theme.colors.primary}
              style={styles.deliveryIcon}
            />
            <Text style={styles.deliveryText}>
              {getDeliveryMessage(
                letter.isSender,
                letter.otherUser.name,
                country?.name || "",
                country?.flag || "",
                getTimeAgo(),
                t
              )}
            </Text>
          </View>
        </View>

        {/* Letter Content */}
        <View style={styles.letterSection}>
          <Ionicons name="mail-open" size={scale(76)} color={theme.colors.primary} style={styles.readerIcon} />
          <Text style={styles.letterTitle}>{letter.title}</Text>
          <View style={{ flex: 1 }}>
            <Separator customOptions={["⋆｡✿ ⋆ ── ⋆ ✿｡⋆"]}/>
            <Text style={styles.letterContent}>{letter.content}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
