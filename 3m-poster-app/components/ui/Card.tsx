import { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MD3Colors, BorderRadius, Spacing } from '@/lib/theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  onPress?: () => void;
}

export function Card({ children, style, elevation = 'low' }: CardProps) {
  const shadowStyle = {
    none: {},
    low: { shadowColor: MD3Colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 1 },
    medium: { shadowColor: MD3Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 3 },
    high: { shadowColor: MD3Colors.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 12, elevation: 6 },
  };

  return (
    <View style={[styles.card, shadowStyle[elevation], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: MD3Colors.surfaceContainer,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
});
