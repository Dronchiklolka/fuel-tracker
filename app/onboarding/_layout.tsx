import { Stack } from 'expo-router';

export default function OnboardingStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="gender" />
      <Stack.Screen name="age" />
      <Stack.Screen name="height" />
      <Stack.Screen name="weight" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="goal" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
