import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { onboardingColors } from './onboarding-theme';

type OnboardingNumberPickerProps = {
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function OnboardingNumberPicker({
  value,
  unit,
  min,
  max,
  onChange,
}: OnboardingNumberPickerProps) {
  const visibleValues = [value - 2, value - 1, value, value + 1, value + 2].filter(
    (item) => item >= min && item <= max
  );

  const updateValue = (nextValue: number) => {
    onChange(Math.min(max, Math.max(min, nextValue)));
  };

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={() => updateValue(value - 1)}
        style={styles.stepperButton}
        hitSlop={10}>
        <MaterialCommunityIcons name="chevron-up" size={28} color={onboardingColors.primaryText} />
      </Pressable>

      <View style={styles.values}>
        {visibleValues.map((item) => {
          const selected = item === value;

          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => updateValue(item)}
              style={[styles.valueRow, selected && styles.valueRowSelected]}>
              <Text style={[styles.valueText, selected && styles.valueTextSelected]}>{item}</Text>
              {selected ? <Text style={styles.unit}>{unit}</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => updateValue(value + 1)}
        style={styles.stepperButton}
        hitSlop={10}>
        <MaterialCommunityIcons name="chevron-down" size={28} color={onboardingColors.primaryText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 228,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: onboardingColors.card,
  },
  stepperButton: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  values: {
    alignSelf: 'stretch',
    gap: 2,
  },
  valueRow: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 96,
  },
  valueRowSelected: {
    height: 44,
    backgroundColor: onboardingColors.background,
  },
  valueText: {
    minWidth: 44,
    color: onboardingColors.secondaryText,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  valueTextSelected: {
    color: onboardingColors.primaryText,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  unit: {
    minWidth: 26,
    color: onboardingColors.primaryText,
    fontSize: 15,
    lineHeight: 18,
  },
});
