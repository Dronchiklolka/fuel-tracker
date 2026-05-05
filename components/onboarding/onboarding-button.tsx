import { Pressable, StyleSheet, Text } from 'react-native';

import { onboardingColors, onboardingSizing } from './onboarding-theme';

type OnboardingButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function OnboardingButton({ title, onPress, disabled = false }: OnboardingButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: onboardingSizing.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: onboardingSizing.cardRadius,
    backgroundColor: onboardingColors.brand,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  text: {
    color: onboardingColors.inverseText,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0,
  },
});
