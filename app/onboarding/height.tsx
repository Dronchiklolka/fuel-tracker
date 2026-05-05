import { router } from 'expo-router';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingNumberPicker } from '@/components/onboarding/onboarding-number-picker';
import { useOnboarding } from '@/contexts/onboarding-context';

export default function HeightScreen() {
  const { height, setHeight } = useOnboarding();

  return (
    <OnboardingLayout
      title="Какой у вас рост?"
      subtitle="Рост помогает точнее рассчитать рекомендации"
      step={3}
      scrollEnabled={false}
      onNext={() => router.push('/onboarding/weight')}>
      <OnboardingNumberPicker value={height} min={120} max={230} unit="см" onChange={setHeight} />
    </OnboardingLayout>
  );
}
