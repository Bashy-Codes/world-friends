import { memo, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { router } from "expo-router";
import { useMutation } from "convex/react";
import { useTheme } from "@/lib/Theme";
import { getCountryByCode } from "@/constants/geographics";
import type { Friend } from "@/types/friendships";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { ProfilePicture } from "@/components/common/ProfilePicture";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import AgeGenderChip from "../AgeGenderChip";

interface FriendCardProps {
  friend: Friend;
  onMessage?: (friendId: Id<"users">) => void;
  onViewProfile?: (userId: Id<"users">) => void;
}

const FriendCardComponent: React.FC<FriendCardProps> = ({
  friend,
  onMessage,
  onViewProfile,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const createConversationMutation = useMutation(
    api.conversations.createConversation
  );
  const country = getCountryByCode(friend.country);

  const handleMessage = useCallback(async () => {
    if (isCreatingConversation) return;

    try {
      setIsCreatingConversation(true);

      // Create or get existing conversation
      const conversationId = await createConversationMutation({
        otherUserId: friend.userId,
      });

      // Navigate to the conversation
      router.push(`/screens/conversation/${conversationId}` as any);

      // Call the optional callback if provided
      onMessage?.(friend.userId);
    } catch (error) {
      console.error("Failed to create conversation:", error);
      // You might want to show a toast or alert here
    } finally {
      setIsCreatingConversation(false);
    }
  }, [
    friend.userId,
    createConversationMutation,
    onMessage,
    isCreatingConversation,
  ]);

  const handleViewProfile = useCallback(() => {
    onViewProfile?.(friend.userId);
  }, [friend.userId, onViewProfile]);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(20),
      marginHorizontal: scale(16),
      marginVertical: verticalScale(8),
      alignItems: "center",
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    profileImageContainer: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(theme.borderRadius.full),
      borderWidth: scale(3),
      borderColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(16),
      overflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
    },
    profileImageError: {
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: verticalScale(12),
    },
    name: {
      fontSize: moderateScale(24),
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
    },
    verifiedIcon: {
      marginLeft: scale(6),
    },
    supporterIcon: {
      marginLeft: scale(4),
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(12),
      width: "100%",
    },
    countryContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: verticalScale(20),
    },
    flagEmoji: {
      fontSize: moderateScale(14),
      marginRight: scale(8),
    },
    countryText: {
      fontSize: moderateScale(16),
      color: theme.colors.text,
      fontWeight: "600",
    },
    buttonsContainer: {
      flexDirection: "row",
      width: "100%",
      gap: scale(12),
    },
  });

  return (
    <TouchableOpacity onPress={handleViewProfile} activeOpacity={0.8} style={styles.card}>
      <ProfilePicture
        profilePicture={friend.profilePicture}
        size={120}
        style={styles.profileImageContainer}
        lazy={true}
        priority="low"
      />

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{friend.name}</Text>
        {friend.isAdmin && (
          <Ionicons
            name="shield-checkmark"
            size={scale(18)}
            color={theme.colors.primary}
            style={styles.verifiedIcon}
          />
        )}
        {friend.isSupporter && (
          <Ionicons
            name="heart"
            size={scale(18)}
            color={theme.colors.secondary}
            style={styles.supporterIcon}
          />
        )}
      </View>

      <View style={styles.infoRow}>
       <AgeGenderChip
          size="medium"
          gender={friend.gender}
          age={friend.age}
        />
      </View>

      <View style={styles.countryContainer}>
        <Text style={styles.flagEmoji}>{country?.flag}</Text>
        <Text style={styles.countryText}>{country?.name || "Unknown"}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          iconName="chatbubble-ellipses"
          onPress={handleMessage}
          style={{flex: 1}}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FriendCard = memo(FriendCardComponent);
