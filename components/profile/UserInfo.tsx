import React, { memo } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useTheme } from "@/lib/Theme";
import { getCountryByCode } from "@/constants/geographics";
import { ProfilePicture } from "@/components/common/ProfilePicture";
import AgeGenderChip from "../AgeGenderChip";

interface UserInfoProps {
  profilePicture: string;
  name: string;
  username: string;
  gender: "male" | "female" | "other";
  age: number;
  countryCode: string;
  isAdmin?: boolean;
  isSupporter?: boolean;
}

export const UserInfo = memo<UserInfoProps>(
  ({
    profilePicture,
    name,
    username,
    gender,
    age,
    countryCode,
    isAdmin = false,
    isSupporter = false,
  }) => {
    const theme = useTheme();

    const country = getCountryByCode(countryCode);

    const styles = StyleSheet.create({
      container: {
        alignItems: "center",
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(20),
      },
      profileImageContainer: {
        width: scale(120),
        height: scale(120),
        borderRadius: scale(60),
        marginBottom: verticalScale(16),
        position: "relative"
      },
      nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: verticalScale(4),
      },
      name: {
        fontSize: moderateScale(30),
        fontWeight: "700",
        color: theme.colors.text,
        textAlign: "center",
      },
      verifiedIcon: {
        marginLeft: scale(8),
      },
      supporterIcon: {
        marginLeft: scale(6),
      },
      username: {
        fontSize: moderateScale(18),
        fontWeight: "500",
        color: theme.colors.textSecondary,
        textAlign: "center",
        marginBottom: verticalScale(12),
      },
      infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: verticalScale(12),
        gap: scale(12),
      },
      detailRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surface,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        borderRadius: scale(theme.borderRadius.full),
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: scale(8),
      },
      countryFlag: {
        fontSize: moderateScale(18),
      },
      countryText: {
        fontSize: moderateScale(16),
        fontWeight: "600",
        color: theme.colors.text,
      },
    });

    return (
      <View style={styles.container}>
        <ProfilePicture
          profilePicture={profilePicture}
          size={120}
          style={styles.profileImageContainer}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          {isAdmin && (
            <Ionicons
              name="shield-checkmark"
              size={scale(24)}
              color={theme.colors.primary}
              style={styles.verifiedIcon}
            />
          )}
          {isSupporter && (
            <Ionicons
              name="heart"
              size={scale(24)}
              color={theme.colors.secondary}
              style={styles.supporterIcon}
            />
          )}
        </View>
        <Text style={styles.username}>@{username}</Text>

        <View style={styles.infoRow}>
         <AgeGenderChip
          size="large"
          gender={gender}
          showGenerText
          age={age}
          />
        </View>
          <View style={styles.detailRow}>
            <Text style={styles.countryFlag}>{country?.flag}</Text>
            <Text style={styles.countryText}>{country?.name}</Text>
          </View>
      </View>
    );
  }
);

UserInfo.displayName = "UserInfo";
