import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  background: '#F7F8F5',
  primaryText: '#18181B',
  secondaryText: '#6B7280',
  brand: '#31D843',
};

export default function OnboardingNextPlaceholderScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      <View style={styles.content}>
        <Text style={styles.title}>Следующий экран</Text>
        <Text style={styles.subtitle}>Здесь позже появится первый шаг onboarding.</Text>
        <Link href="/" style={styles.link}>
          Назад
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 14,
  },
  title: {
    color: COLORS.primaryText,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.secondaryText,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    color: COLORS.brand,
    fontSize: 18,
    fontWeight: '600',
  },
});
