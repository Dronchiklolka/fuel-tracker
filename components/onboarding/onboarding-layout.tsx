import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingButton } from './onboarding-button';
import { OnboardingProgress } from './onboarding-progress';
import { onboardingColors, onboardingSizing } from './onboarding-theme';

type OnboardingLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  step: number;
  totalSteps?: number;
  nextLabel?: string;
  onNext: () => void;
  canGoBack?: boolean;
  contentTopOffset?: number;
  scrollEnabled?: boolean;
}>;

export function OnboardingLayout({
  title,
  subtitle,
  step,
  totalSteps = 6,
  nextLabel = 'Далее',
  onNext,
  canGoBack = true,
  contentTopOffset = 26,
  scrollEnabled = true,
  children,
}: OnboardingLayoutProps) {
  const insets = useSafeAreaInsets();
  const contentStyle = [
    styles.content,
    {
      paddingTop: contentTopOffset,
      paddingBottom: insets.bottom + 136,
    },
  ];
  const content = (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.body}>{children}</View>
    </>
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={onboardingColors.background} />

      <View style={[styles.topBar, { paddingTop: insets.top + 11 }]}>
        {canGoBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={12}>
            <MaterialCommunityIcons name="chevron-left" size={28} color={onboardingColors.primaryText} />
          </Pressable>
        ) : null}
        <OnboardingProgress step={step} totalSteps={totalSteps} />
      </View>

      {scrollEnabled ? (
        <ScrollView contentContainerStyle={contentStyle} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        <View style={contentStyle}>{content}</View>
      )}

      <View style={[styles.bottomButton, { paddingBottom: Math.max(insets.bottom + 2, 36) }]}>
        <OnboardingButton title={nextLabel} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: onboardingColors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    paddingHorizontal: onboardingSizing.horizontalPadding,
  },
  backButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: onboardingSizing.horizontalPadding,
  },
  title: {
    color: onboardingColors.primaryText,
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 41,
    letterSpacing: 0,
  },
  subtitle: {
    maxWidth: 358,
    marginTop: 12,
    color: onboardingColors.secondaryText,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
  },
  body: {
    marginTop: 24,
    gap: 12,
  },
  bottomButton: {
    position: 'absolute',
    left: onboardingSizing.buttonHorizontalInset,
    right: onboardingSizing.buttonHorizontalInset,
    bottom: 0,
  },
});
