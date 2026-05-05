import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingNumberPicker } from '@/components/onboarding/onboarding-number-picker';
import { useOnboarding } from '@/contexts/onboarding-context';

export default function WeightScreen() {
  const { weight, setWeight } = useOnboarding();

  return (
    <OnboardingLayout
      title="Сколько вы весите?"
      subtitle="Вес помогает точнее рассчитать рекомендации"
      step={4}
      onNext={() => router.push('/onboarding/activity')}>
      <OnboardingNumberPicker value={weight} min={35} max={220} unit="кг" onChange={setWeight} />
    </OnboardingLayout>
  );
}
