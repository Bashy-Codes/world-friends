import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/Theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Button } from "@/components/ui/Button";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import Toast from "react-native-toast-message";

export default function SupporterScreen() {
    const theme = useTheme();



    // RevenueCat hook
    const {
        isInitialized,
        isLoading,
        isPurchasing,
        isRestoring,
        supporterPackage,
        isSupporterActive,
        makePurchase,
        restoreUserPurchases,
    } = useRevenueCat();

    const handleDonate = async () => {
        if (Platform.OS === 'web') {
            // Show message for web users
            Toast.show({
                type: 'info',
                text1: 'Mobile Only Feature',
                text2: 'Donations are only available on mobile devices',
            });
            return;
        }

        if (!isInitialized) {
            Toast.show({
                type: 'error',
                text1: 'Not Ready',
                text2: 'Payment system is still loading. Please try again.',
            });
            return;
        }

        const success = await makePurchase();
        // The hook handles success/error messages
    };

    const handleRestore = async () => {
        if (Platform.OS === 'web') {
            Toast.show({
                type: 'info',
                text1: 'Mobile Only Feature',
                text2: 'Purchase restoration is only available on mobile devices',
            });
            return;
        }

        await restoreUserPurchases();
    };

    // Get package price for display
    const packagePrice = supporterPackage?.product.priceString;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["left", "right"]}>
            <ScreenHeader title="Become a Supporter" />

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                        <Ionicons name="heart" size={scale(48)} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Support WorldFriends
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                        Help student developers keep the platform alive!
                    </Text>
                </View>

                {/* Explanation Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        Why Become a Supporter?
                    </Text>
                    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.cardText, { color: theme.colors.text }]}>
                            WorldFriends is a passion project built by a solo high school student. Your one-time $2.99 donation helps support ongoing development and ensures that the app remains free and accessible to everyone.
                        </Text>
                    </View>
                </View>

                {/* Benefits Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        What You Get
                    </Text>
                    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                        <View style={styles.benefitItem}>
                            <Ionicons name="heart" size={scale(20)} color={theme.colors.error} />
                            <Text style={[styles.benefitText, { color: theme.colors.text }]}>
                                Special supporter heart badge on your profile
                            </Text>
                        </View>
                        <View style={styles.benefitItem}>
                            <Ionicons name="star" size={scale(20)} color={theme.colors.warning} />
                            <Text style={[styles.benefitText, { color: theme.colors.text }]}>
                                Eternal gratitude and supporter status
                            </Text>
                        </View>
                        <View style={styles.benefitItem}>
                            <Ionicons name="earth" size={scale(20)} color={theme.colors.primary} />
                            <Text style={[styles.benefitText, { color: theme.colors.text }]}>
                                Contribute to connecting people worldwide
                            </Text>
                        </View>
                    </View>
                </View>

                {/* CTA Section */}
                <View style={styles.ctaSection}>
                    <Button
                        iconName="heart"
                        text={`Become a Supporter - ${packagePrice}`}
                        onPress={handleDonate}
                        disabled={isPurchasing || isRestoring}
                    />
                    <Text style={[styles.ctaNote, { color: theme.colors.textMuted }]}>
                        One-time payment • Powered by RevenueCat
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
                        Thank you for your support! ❤️
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(40),
    },
    heroSection: {
        alignItems: "center",
        paddingVertical: verticalScale(32),
    },
    iconContainer: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(40),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(16),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: "700",
        marginBottom: verticalScale(8),
    },
    subtitle: {
        fontSize: moderateScale(16),
        fontWeight: "500",
        textAlign: "center",
    },
    section: {
        marginBottom: verticalScale(32),
    },
    sectionTitle: {
        fontSize: moderateScale(20),
        fontWeight: "700",
        marginBottom: verticalScale(16),
    },
    card: {
        borderRadius: moderateScale(16),
        padding: scale(20),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        fontSize: moderateScale(15),
        lineHeight: moderateScale(22),
        textAlign: "center",
    },
    benefitItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(12),
        gap: scale(12),
    },
    benefitText: {
        fontSize: moderateScale(15),
        flex: 1,
    },
    ctaSection: {
        alignItems: "center",
        marginBottom: verticalScale(32),
    },
    ctaNote: {
        fontSize: moderateScale(12),
        marginTop: verticalScale(12),
    },
    footer: {
        alignItems: "center",
    },
    footerText: {
        fontSize: moderateScale(14),
    },
});