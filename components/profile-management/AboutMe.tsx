import React, { useRef, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/lib/Theme";
import { ItemPickerSheet, PickerItem, ItemPickerSheetRef } from "@/components/ItemPickerSheet";
import { HOBBIES, getHobbyById } from "@/constants/geographics";
import { Separator } from "@/components/common/Separator";
import { LargeInputContainer } from "@/components/common/LargeInputContainer";
import { ItemSelector } from "@/components/common/ItemSelector";
import { SelectedItem } from "@/components/common/SelectedItem";
import { InputModal } from "@/components/common/InputModal";

interface AboutMeProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const AboutMe: React.FC<AboutMeProps> = ({ control, errors }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const hobbiesSheetRef = useRef<ItemPickerSheetRef>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  const hobbyItems: PickerItem[] = useMemo(
    () =>
      HOBBIES.map((hobby) => ({
        id: hobby.id,
        name: hobby.name,
        code: hobby.id, // Use id as code for hobbies
        emoji: hobby.emoji,
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

  });



  const renderSelectedHobbies = (
    hobbyIds: string[],
    onRemove: (id: string) => void
  ) => {
    if (hobbyIds.length === 0) return null;

    return (
      <>
        {hobbyIds.map((id) => {
          const hobby = getHobbyById(id);
          if (!hobby) return null;

          return (
            <SelectedItem
              key={id}
              text={hobby.name}
              emoji={hobby.emoji}
              onRemove={() => onRemove(id)}
            />
          );
        })}
      </>
    );
  };

  const renderSelectedBooks = (
    books: string[],
    onRemove: (index: number) => void
  ) => {
    if (books.length === 0) return null;

    return (
      <>
        {books.map((book, index) => (
          <SelectedItem
            key={index}
            text={book}
            onRemove={() => onRemove(index)}
          />
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={styles.label}>{t("createProfile.aboutMe.bio.label")}</Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <LargeInputContainer
              minLength={100}
              maxLength={1000}
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={t("createProfile.aboutMe.bio.placeholder")}
              placeholderTextColor={theme.colors.textMuted}
              selectionColor={theme.colors.primary}
              autoCorrect={true}
            />
          )}
        />
      </View>
      <Separator customOptions={["☾ ⋆⁺₊✧ ── ✧₊⁺⋆ ☽"]} />
      {/* Hobbies Section */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {t("createProfile.aboutMe.hobbies.label")}
        </Text>
        <Controller
          control={control}
          name="hobbies"
          render={({ field: { onChange, value } }) => (
            <>
              <ItemSelector
                placeholder={t("createProfile.aboutMe.hobbies.placeholder")}
                hasError={!!errors.hobbies}
                onPress={() => hobbiesSheetRef.current?.present()}
              >
                {value &&
                  value.length > 0 &&
                  renderSelectedHobbies(value, (id) => {
                    const newValue = value.filter(
                      (hobby: string) => hobby !== id
                    );
                    onChange(newValue);
                  })}
              </ItemSelector>
              <ItemPickerSheet
                ref={hobbiesSheetRef}
                items={hobbyItems}
                selectedItems={value || []}
                onSelectionChange={onChange}
                onConfirm={() => hobbiesSheetRef.current?.dismiss()}
                multiSelect={true}
                searchPlaceholder={t("common.searchPlaceholder")}
              />
            </>
          )}
        />
      </View>
      <Separator customOptions={["☾ ⋆⁺₊✧ ── ✧₊⁺⋆ ☽"]} />
      {/* Favorite Books Section */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {t("createProfile.aboutMe.favoriteBooks.label")}
        </Text>
        <Controller
          control={control}
          name="favoriteBooks"
          render={({ field: { onChange, value } }) => (
            <>
              <ItemSelector
                placeholder={t("createProfile.aboutMe.favoriteBooks.placeholder")}
                hasError={!!errors.favoriteBooks}
                onPress={() => setShowBookModal(true)}
              >
                {value &&
                  value.length > 0 &&
                  renderSelectedBooks(value, (index) => {
                    const newBooks = value.filter(
                      (_: string, i: number) => i !== index
                    );
                    onChange(newBooks);
                  })}
              </ItemSelector>
              <InputModal
                visible={showBookModal}
                title={t("createProfile.aboutMe.booksModal.title")}
                inputPlaceholder={t("createProfile.aboutMe.booksModal.inputPlaceholder")}
                maxCharacters={30}
                onSubmit={(text) => {
                  const newBooks = [...(value || []), text];
                  onChange(newBooks);
                  setShowBookModal(false);
                }}
                onCancel={() => setShowBookModal(false)}
                submitIcon="add"
              />
            </>
          )}
        />
      </View>
    </View>
  );
};
