import type React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "@/lib/Theme";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const PostCardSkeleton: React.FC = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      width: SCREEN_WIDTH,
      marginBottom: verticalScale(1),
      paddingBottom: verticalScale(12),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(12),
    },
    profileImage: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      width: scale(120),
      height: verticalScale(16),
      borderRadius: scale(theme.borderRadius.sm),
      marginBottom: verticalScale(4),
    },
    timeAgo: {
      width: scale(60),
      height: verticalScale(12),
      borderRadius: scale(theme.borderRadius.sm),
    },
    moreButton: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(theme.borderRadius.sm),
    },
    content: {
      paddingHorizontal: scale(16),
      marginBottom: verticalScale(12),
    },
    contentLine: {
      height: verticalScale(14),
      borderRadius: scale(theme.borderRadius.sm),
      marginBottom: verticalScale(6),
    },
    contentLine1: {
      width: "90%",
    },
    contentLine2: {
      width: "75%",
    },
    contentLine3: {
      width: "60%",
    },
    imagesContainer: {
      marginBottom: verticalScale(12),
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(8),
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%"
    },
    separator: {
      width: scale(100),
      height: verticalScale(1),
      borderRadius: scale(theme.borderRadius.sm),
      marginBottom: verticalScale(8),
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: scale(16),
      // No paddingBottom here, as it's handled by container
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: scale(20), // Match PostCard margin
    },
    actionIcon: {
      width: scale(22), // Match PostCard icon size
      height: scale(22), // Match PostCard icon size
      borderRadius: scale(theme.borderRadius.sm),
      marginRight: scale(6),
    },
    actionText: {
      width: scale(30),
      height: verticalScale(14),
      borderRadius: scale(theme.borderRadius.sm),
    },
    bookmarkButton: {
      marginLeft: "auto",
      width: scale(22), // Match PostCard icon size
      height: scale(22), // Match PostCard icon size
      borderRadius: scale(theme.borderRadius.sm),
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.userName}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.timeAgo}
          />
        </View>
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={styles.moreButton}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={[styles.contentLine, styles.contentLine1]}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={[styles.contentLine, styles.contentLine2]}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={[styles.contentLine, styles.contentLine3]}
        />
      </View>

      {/* Images */}
      <View style={styles.imagesContainer}>
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={styles.separator}
        />
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={styles.image}
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.actionIcon}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.actionText}
          />
        </View>
        <View style={styles.actionButton}>
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.actionIcon}
          />
          <ShimmerPlaceholder
            shimmerColors={[
              theme.colors.surfaceSecondary,
              theme.colors.border,
              theme.colors.surfaceSecondary,
            ]}
            style={styles.actionText}
          />
        </View>
        <ShimmerPlaceholder
          shimmerColors={[
            theme.colors.surfaceSecondary,
            theme.colors.border,
            theme.colors.surfaceSecondary,
          ]}
          style={styles.bookmarkButton}
        />
      </View>
    </View>
  );
};
