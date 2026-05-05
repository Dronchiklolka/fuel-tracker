import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingNumberPicker } from '@/components/onboarding/onboarding-number-picker';
import { useOnboarding } from '@/contexts/onboarding-context';

export default function AgeScreen() {
  const { age, setAge } = useOnboarding();

  return (
    <OnboardingLayout
      title="Сколько вам лет?"
      subtitle="Это влияет на расчёт рекомендаций"
      step={2}
      scrollEnabled={false}
      onNext={() => router.push('/onboarding/height')}>
      <OnboardingNumberPicker value={age} min={13} max={100} unit="лет" onChange={setAge} />
    </OnboardingLayout>
  );
}
