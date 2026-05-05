import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingOptionCard } from '@/components/onboarding/onboarding-option-card';
import { useOnboarding } from '@/contexts/onboarding-context';

export default function GenderScreen() {
  const { gender, setGender } = useOnboarding();

  return (
    <OnboardingLayout
      title="Ваш пол"
      subtitle="Это поможет точнее настроить рекомендации"
      step={1}
      canGoBack={false}
      contentTopOffset={31}
      onNext={() => router.push('/onboarding/age')}>
      <OnboardingOptionCard
        title="Мужской"
        iconName="gender-male"
        selected={gender === 'male'}
        onPress={() => setGender('male')}
      />
      <OnboardingOptionCard
        title="Женский"
        iconName="gender-female"
        selected={gender === 'female'}
        onPress={() => setGender('female')}
      />
    </OnboardingLayout>
  );
}
