import { StyleSheet, Text, View } from 'react-native';
import { MD3Colors, Typography, Spacing, BorderRadius } from '@/lib/theme';

interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

export function Badge({ label, color, backgroundColor }: BadgeProps) {
  const bgColor = backgroundColor || MD3Colors.secondaryContainer;
  const textColor = color || MD3Colors.onSecondaryContainer;

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
});
