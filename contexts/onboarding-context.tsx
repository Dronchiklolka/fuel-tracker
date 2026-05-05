import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type Gender = 'male' | 'female';
export type ActivityLevel = 'very_low' | 'low' | 'moderate' | 'high';
export type Goal = 'lose' | 'maintain' | 'gain';

export type OnboardingData = {
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: Goal;
};

type OnboardingContextValue = OnboardingData & {
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setActivityLevel: (activityLevel: ActivityLevel) => void;
  setGoal: (goal: Goal) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(185);
  const [weight, setWeight] = useState(78);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('very_low');
  const [goal, setGoal] = useState<Goal>('lose');

  const value = useMemo(
    () => ({
      gender,
      age,
      height,
      weight,
      activityLevel,
      goal,
      setGender,
      setAge,
      setHeight,
      setWeight,
      setActivityLevel,
      setGoal,
    }),
    [activityLevel, age, gender, goal, height, weight]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return context;
}
