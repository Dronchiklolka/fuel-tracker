import { StyleSheet, View } from 'react-native';

import { onboardingColors } from './onboarding-theme';

type OnboardingProgressProps = {
  step: number;
  totalSteps: number;
};

export function OnboardingProgress({ step, totalSteps }: OnboardingProgressProps) {
  return (
    <View style={styles.container} accessibilityRole="progressbar">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.segment, index < step ? styles.segmentActive : styles.segmentInactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    flex: 1,
    borderRadius: 999,
  },
  segmentActive: {
    backgroundColor: onboardingColors.brand,
  },
  segmentInactive: {
    backgroundColor: onboardingColors.brandMuted,
  },
});
