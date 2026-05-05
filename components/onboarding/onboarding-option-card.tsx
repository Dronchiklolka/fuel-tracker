import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { onboardingColors } from './onboarding-theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type OnboardingOptionCardProps = {
  title: string;
  subtitle?: string;
  iconName: IconName;
  selected: boolean;
  onPress: () => void;
};

export function OnboardingOptionCard({
  title,
  subtitle,
  iconName,
  selected,
  onPress,
}: OnboardingOptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={selected ? onboardingColors.brand : onboardingColors.primaryText}
      />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {selected ? (
        <MaterialCommunityIcons name="check" size={20} color={onboardingColors.brand} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: onboardingColors.border,
    borderRadius: 16,
    backgroundColor: onboardingColors.card,
  },
  cardSelected: {
    borderColor: onboardingColors.selectedBorder,
    backgroundColor: onboardingColors.cardSelected,
  },
  cardPressed: {
    opacity: 0.86,
  },
  textBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: onboardingColors.primaryText,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
  },
  subtitle: {
    color: onboardingColors.secondaryText,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
  },
});
