import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingOptionCard } from '@/components/onboarding/onboarding-option-card';
import { Goal, useOnboarding } from '@/contexts/onboarding-context';

const GOAL_OPTIONS: {
  value: Goal;
  title: string;
  subtitle: string;
  iconName: 'trending-down' | 'equal' | 'trending-up';
}[] = [
  {
    value: 'lose',
    title: 'Похудеть',
    subtitle: 'Снизить вес и стать легче',
    iconName: 'trending-down',
  },
  {
    value: 'maintain',
    title: 'Поддерживать',
    subtitle: 'Сохранить текущую форму',
    iconName: 'equal',
  },
  {
    value: 'gain',
    title: 'Набрать',
    subtitle: 'Увеличить вес и силу',
    iconName: 'trending-up',
  },
];

export default function GoalScreen() {
  const { goal, setGoal } = useOnboarding();

  return (
    <OnboardingLayout
      title="Какая у вас цель?"
      subtitle="Это поможет точнее настроить рекомендации"
      step={6}
      onNext={() => router.push('/onboarding/summary')}>
      {GOAL_OPTIONS.map((option) => (
        <OnboardingOptionCard
          key={option.value}
          title={option.title}
          subtitle={option.subtitle}
          iconName={option.iconName}
          selected={goal === option.value}
          onPress={() => setGoal(option.value)}
        />
      ))}
    </OnboardingLayout>
  );
}
