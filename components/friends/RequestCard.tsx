import type React from "react";
import { memo, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useTheme } from "@/lib/Theme";
import { getCountryByCode } from "@/constants/geographics";
import type { Request } from "@/types/friendships";
import { Id } from "@/convex/_generated/dataModel";
import { Image } from "expo-image";

interface RequestCardProps {
  request: Request;
  onAccept: (requestId: Id<"friendRequests">) => void;
  onDecline: (requestId: Id<"friendRequests">) => void;
}

const RequestCardComponent: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onDecline,
}) => {
  const theme = useTheme();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  const country = getCountryByCode(request.country);

  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  const handleReadMessage = useCallback(() => {
    setShowMessageModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowMessageModal(false);
  }, []);

  const handleAccept = useCallback(() => {
    onAccept(request.requestId);
    setShowMessageModal(false);
  }, [request.requestId, onAccept]);

  const handleDecline = useCallback(() => {
    onDecline(request.requestId);
    setShowMessageModal(false);
  }, [request.requestId, onDecline]);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      marginHorizontal: scale(16),
      marginVertical: verticalScale(8),
      padding: scale(16),
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: verticalScale(12),
    },
    profileImageContainer: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      marginRight: scale(12),
      overflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: moderateScale(16),
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: verticalScale(2),
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(8),
    },
    genderButton: {
      backgroundColor: `${theme.colors.secondary}15`,
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(4),
      borderRadius: scale(12),
      alignItems: "center",
      justifyContent: "center",
    },
    genderButtonMale: {
      backgroundColor: `${theme.colors.info}15`,
    },
    genderButtonOther: {
      backgroundColor: `${theme.colors.warning}15`,
    },
    ageButton: {
      backgroundColor: `${theme.colors.primary}15`,
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(4),
      borderRadius: scale(12),
      flexDirection: "row",
      alignItems: "center",
      gap: scale(4),
    },
    ageText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: theme.colors.primary,
    },
    countryContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: verticalScale(8),
      gap: scale(6),
    },
    flagEmoji: {
      fontSize: moderateScale(16),
    },
    countryText: {
      fontSize: moderateScale(14),
      color: theme.colors.textSecondary,
      fontWeight: "500",
    },
    actionsContainer: {
      flexDirection: "row",
      gap: scale(12),
      marginTop: verticalScale(12),
    },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: verticalScale(10),
      borderRadius: scale(theme.borderRadius.md),
      gap: scale(6),
    },
    readMessageButton: {
      backgroundColor: theme.colors.primary,
    },
    acceptButton: {
      backgroundColor: theme.colors.success,
    },
    declineButton: {
      backgroundColor: theme.colors.error,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.xl),
      width: '90%',
      maxWidth: scale(400),
      padding: scale(24),
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 20,
    },
    modalHeader: {
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    messageContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: scale(theme.borderRadius.md),
      padding: scale(16),
      marginBottom: verticalScale(20),
    },
    messageText: {
      fontSize: moderateScale(16),
      color: theme.colors.text,
      lineHeight: moderateScale(22),
    },
    modalActionsContainer: {
      flexDirection: 'row',
      gap: scale(12),
    },
  });

  return (
    <>
      <View style={styles.card}>
        {/* Header with profile info */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: request.profilePicture }}
              style={styles.profileImage}
              contentFit="cover"
              transition={150}
              cachePolicy="memory-disk"
              priority="normal"
              placeholder={require("@/assets/images/user.png")}
              />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.name}>{request.name}</Text>
            <View style={styles.infoRow}>
              <View
                style={[
                  styles.genderButton,
                  request.gender === "male" && styles.genderButtonMale,
                  request.gender === "other" && styles.genderButtonOther,
                ]}
              >
                <Text style={{ fontSize: moderateScale(14) }}>
                  {request.gender === "female"
                    ? "👩"
                    : request.gender === "male"
                      ? "👨"
                      : "👤"}
                </Text>
              </View>
              <View style={styles.ageButton}>
                <Text style={styles.ageText}>🎂</Text>
                <Text style={styles.ageText}>{request.age}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Country info */}
        <View style={styles.countryContainer}>
          <Text style={styles.flagEmoji}>{country?.flag}</Text>
          <Text style={styles.countryText}>
            {country?.name}
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.readMessageButton]}
            onPress={handleReadMessage}
            activeOpacity={0.8}
          >
            <Ionicons
              name="mail-open"
              size={scale(26)}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Message Modal */}
      <Modal
        visible={showMessageModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="reader"
                size={scale(76)}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
               {request.requestMessage}
              </Text>
            </View>

            <View style={styles.modalActionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.declineButton]}
                onPress={handleDecline}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="trash-sharp"
                  size={scale(16)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={handleAccept}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={scale(16)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const RequestCard = memo(RequestCardComponent);
