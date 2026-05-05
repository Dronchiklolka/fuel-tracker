import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingOptionCard } from '@/components/onboarding/onboarding-option-card';
import { ActivityLevel, useOnboarding } from '@/contexts/onboarding-context';

const ACTIVITY_OPTIONS: {
  value: ActivityLevel;
  title: string;
  subtitle: string;
  iconName: 'seat-outline' | 'walk' | 'run-fast' | 'dumbbell';
}[] = [
  {
    value: 'very_low',
    title: 'Очень низкий',
    subtitle: 'Почти без нагрузки',
    iconName: 'seat-outline',
  },
  {
    value: 'low',
    title: 'Низкий',
    subtitle: 'Небольшая активность в течение дня',
    iconName: 'walk',
  },
  {
    value: 'moderate',
    title: 'Умеренный',
    subtitle: 'Регулярная активность и тренировки',
    iconName: 'run-fast',
  },
  {
    value: 'high',
    title: 'Высокий',
    subtitle: 'Интенсивные тренировки и нагрузка',
    iconName: 'dumbbell',
  },
];

export default function ActivityScreen() {
  const { activityLevel, setActivityLevel } = useOnboarding();

  return (
    <OnboardingLayout
      title="Какой у вас уровень активности?"
      subtitle="Это поможет точнее расчитать дневную норму"
      step={5}
      contentTopOffset={26}
      onNext={() => router.push('/onboarding/goal')}>
      {ACTIVITY_OPTIONS.map((option) => (
        <OnboardingOptionCard
          key={option.value}
          title={option.title}
          subtitle={option.subtitle}
          iconName={option.iconName}
          selected={activityLevel === option.value}
          onPress={() => setActivityLevel(option.value)}
        />
      ))}
    </OnboardingLayout>
  );
}
