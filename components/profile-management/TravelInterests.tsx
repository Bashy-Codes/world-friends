import React, { useRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/lib/Theme";
import { ItemPickerSheet, PickerItem, ItemPickerSheetRef } from "@/components/ItemPickerSheet";
import { COUNTRIES, getCountryByCode } from "@/constants/geographics";
import { Separator } from "@/components/common/Separator";
import { ItemSelector } from "@/components/common/ItemSelector";
import { SelectedItem } from "@/components/common/SelectedItem";

interface TravelInterestsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const TravelInterests: React.FC<TravelInterestsProps> = ({
  control,
  errors,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const countriesTraveledSheetRef = useRef<ItemPickerSheetRef>(null);
  const countriesWantToTravelSheetRef = useRef<ItemPickerSheetRef>(null);

  const countryItems: PickerItem[] = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        id: country.code,
        name: country.name,
        code: country.code,
        emoji: country.flag,
      })),
    []
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: scale(20),
    },
    section: {
      marginBottom: verticalScale(24),
    },
    label: {
      fontSize: moderateScale(16),
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: verticalScale(8),
    },
    sectionIcon: {
      alignItems: "center",
      paddingVertical: verticalScale(40),
    },
  });

  const renderSelectedCountries = (
    countryCodes: string[],
    onRemove: (code: string) => void
  ) => {
    if (!countryCodes || countryCodes.length === 0) return null;

    return (
      <>
        {countryCodes.map((code) => {
          const country = getCountryByCode(code);
          if (!country) return null;

          return (
            <SelectedItem
              key={code}
              text={country.name}
              emoji={country.flag}
              onRemove={() => onRemove(code)}
            />
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.section}>
        <View style={styles.sectionIcon}>
          <Ionicons
            name="airplane"
            size={scale(76)}
            color={theme.colors.primary}
          />
        </View>
      </View>

      {/* Countries Traveled */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {t("createProfile.travelInterests.visitedCountries.label")}
        </Text>
        <Controller
          control={control}
          name="countriesTraveled"
          render={({ field: { onChange, value } }) => (
            <>
              <ItemSelector
                placeholder={t("createProfile.travelInterests.visitedCountries.placeholder")}
                hasError={!!errors.countriesTraveled}
                onPress={() => countriesTraveledSheetRef.current?.present()}
              >
                {value &&
                  value.length > 0 &&
                  renderSelectedCountries(value, (code: string) => {
                    const newValue = value.filter(
                      (country: string) => country !== code
                    );
                    onChange(newValue);
                  })}
              </ItemSelector>
              <ItemPickerSheet
                ref={countriesTraveledSheetRef}
                items={countryItems}
                selectedItems={value || []}
                onSelectionChange={onChange}
                onConfirm={() => countriesTraveledSheetRef.current?.dismiss()}
                multiSelect={true}
                searchPlaceholder={t("common.searchPlaceholder")}
              />
            </>
          )}
        />
      </View>
      <Separator customOptions={["☾ ⋆⁺₊✧ ── ✧₊⁺⋆ ☽"]} />
      {/* Countries Want to Travel */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {t("createProfile.travelInterests.wantToVisitCountries.label")}
        </Text>
        <Controller
          control={control}
          name="countriesWantToTravel"
          render={({ field: { onChange, value } }) => (
            <>
              <ItemSelector
                placeholder={t("createProfile.travelInterests.wantToVisitCountries.placeholder")}
                hasError={!!errors.countriesWantToTravel}
                onPress={() => countriesWantToTravelSheetRef.current?.present()}
              >
                {value &&
                  value.length > 0 &&
                  renderSelectedCountries(value, (code: string) => {
                    const newValue = value.filter(
                      (country: string) => country !== code
                    );
                    onChange(newValue);
                  })}
              </ItemSelector>
              <ItemPickerSheet
                ref={countriesWantToTravelSheetRef}
                items={countryItems}
                selectedItems={value || []}
                onSelectionChange={onChange}
                onConfirm={() => countriesWantToTravelSheetRef.current?.dismiss()}
                multiSelect={true}
                searchPlaceholder={t("common.searchPlaceholder")}
              />
            </>
          )}
        />
      </View>
    </View>
  );
};
