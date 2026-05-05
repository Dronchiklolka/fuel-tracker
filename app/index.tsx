import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 852;

const COLORS = {
  background: '#F7F8F5',
  primaryText: '#18181B',
  secondaryText: '#6B7280',
  brand: '#31D843',
  inverseText: '#FFFFFF',
};

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scale = Math.min(width / SCREEN_WIDTH, height / SCREEN_HEIGHT, 1);
  const horizontalInset = Math.max(20, Math.round((width - 358) / 2));
  const buttonBottom = Math.max(36, insets.bottom + 2);
  const logoTop = Math.max(220 * scale, height * 0.368);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={COLORS.background} />

      <Image
        source={require('@/assets/images/welcome-logo.png')}
        contentFit="contain"
        style={[
          styles.logo,
          {
            width: 193 * scale,
            height: 186 * scale,
            top: logoTop,
          },
        ]}
      />

      <View
        style={[
          styles.copyContainer,
          {
            left: horizontalInset,
            right: horizontalInset,
            bottom: buttonBottom + 56 + 40,
          },
        ]}>
        <Text style={styles.title}>Добро пожаловать в FitSecret</Text>
        <Text style={styles.subtitle}>Удобный контроль питания и прогресса</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/onboarding/gender')}
        style={({ pressed }) => [
          styles.button,
          {
            left: horizontalInset,
            right: horizontalInset,
            bottom: buttonBottom,
            opacity: pressed ? 0.86 : 1,
          },
        ]}>
        <Text style={styles.buttonText}>Начать</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
  },
  copyContainer: {
    position: 'absolute',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: COLORS.primaryText,
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 41,
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    color: COLORS.secondaryText,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    letterSpacing: 0,
  },
  button: {
    position: 'absolute',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.brand,
  },
  buttonText: {
    color: COLORS.inverseText,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0,
  },
});
