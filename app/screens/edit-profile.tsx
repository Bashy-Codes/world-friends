import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@/lib/Theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { LoadingModal } from "@/components/common/LoadingModal";
import { useEditProfile } from "@/hooks/useEditProfile";
import { useTranslation } from "react-i18next";
import { ReliableKeyboardAvoidingView } from "@/components/common/CustomKeyboardAvoidingView";

export default function EditProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    scrollViewRef,
    isUpdating,
    loadingModalState,
    control,
    errors,
    currentStepData,
    isFirstStep,
    progressPercentage,
    handleNext,
    handleBack,
    handleLoadingModalComplete,
    getButtonText,
  } = useEditProfile();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    progressContainer: {
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(16),
    },
    progressBar: {
      height: verticalScale(6),
      backgroundColor: theme.colors.borderLight,
      borderRadius: scale(theme.borderRadius.full),
      overflow: "hidden",
      marginBottom: verticalScale(8),
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: scale(theme.borderRadius.full),
    },
    scrollContainer: {
      flex: 1,
    },
    stepContainer: {
      flex: 1,
      paddingBottom: verticalScale(100), // Space for button
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.xl),
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(16) + insets.bottom,
    },
    buttonRow: {
      flexDirection: "row",
      gap: scale(12),
    },
    button: {
      flex: 1,
      paddingVertical: verticalScale(16),
      borderRadius: scale(theme.borderRadius.xl),
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    secondaryButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    primaryButtonText: {
      fontSize: moderateScale(18),
      fontWeight: "600",
      color: theme.colors.white,
    },
    secondaryButtonText: {
      fontSize: moderateScale(18),
      fontWeight: "600",
      color: theme.colors.text,
    },
  });

  const CurrentStepComponent = currentStepData?.component;

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title={currentStepData?.title || "Edit Profile"}
        onBack={handleBack}
      />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      {/* Wrap ScrollView in KeyboardAvoidingView */}
      <ReliableKeyboardAvoidingView enabled={true}>
        {/* Step Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.stepContainer}>
            {CurrentStepComponent && (
              <CurrentStepComponent control={control} errors={errors} />
            )}
          </View>
        </ScrollView>
      </ReliableKeyboardAvoidingView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {!isFirstStep && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                {t("common.back")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{getButtonText()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Modal */}
      <LoadingModal
        visible={loadingModalState !== 'hidden'}
        state={loadingModalState === 'hidden' ? 'loading' : loadingModalState}
        onComplete={handleLoadingModalComplete}
      />
    </SafeAreaView>
  );
}
