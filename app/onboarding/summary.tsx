import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { onboardingColors } from '@/components/onboarding/onboarding-theme';
import { ActivityLevel, Gender, Goal, useOnboarding } from '@/contexts/onboarding-context';

const genderLabels: Record<Gender, string> = {
  male: 'Мужской',
  female: 'Женский',
};

const activityLabels: Record<ActivityLevel, string> = {
  very_low: 'Очень низкий',
  low: 'Низкий',
  moderate: 'Умеренный',
  high: 'Высокий',
};

const goalLabels: Record<Goal, string> = {
  lose: 'Похудеть',
  maintain: 'Поддерживать',
  gain: 'Набрать',
};

export default function SummaryScreen() {
  const { gender, age, height, weight, activityLevel, goal } = useOnboarding();

  return (
    <OnboardingLayout
      title="Готово"
      subtitle="Мы подготовили стартовые параметры для ваших рекомендаций"
      step={6}
      nextLabel="Продолжить"
      onNext={() => router.push('/onboarding-next')}>
      {/* TODO: уточнить точный summary frame в Figma, когда MCP-лимит снова позволит получить context. */}
      <View style={styles.successIcon}>
        <MaterialCommunityIcons name="check" size={42} color={onboardingColors.brand} />
      </View>

      <View style={styles.summaryCard}>
        <SummaryRow label="Пол" value={genderLabels[gender]} />
        <SummaryRow label="Возраст" value={`${age} лет`} />
        <SummaryRow label="Рост" value={`${height} см`} />
        <SummaryRow label="Вес" value={`${weight} кг`} />
        <SummaryRow label="Активность" value={activityLabels[activityLevel]} />
        <SummaryRow label="Цель" value={goalLabels[goal]} isLast />
      </View>
    </OnboardingLayout>
  );
}

function SummaryRow({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  successIcon: {
    alignSelf: 'center',
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44,
    backgroundColor: onboardingColors.cardSelected,
  },
  summaryCard: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: onboardingColors.card,
    paddingHorizontal: 18,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: onboardingColors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    color: onboardingColors.secondaryText,
    fontSize: 15,
    lineHeight: 18,
  },
  value: {
    flex: 1,
    color: onboardingColors.primaryText,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'right',
  },
});
