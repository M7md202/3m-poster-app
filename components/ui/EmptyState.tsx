import { StyleSheet, Text, View } from 'react-native';
import { MD3Colors, Typography, Spacing, BorderRadius } from '@/lib/theme';
import { Activity } from 'lucide-react-native';

export function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || <Activity size={40} color={MD3Colors.outline} strokeWidth={1.5} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  padding: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: MD3Colors.surfaceContainerHigh,
  overflow: 'hidden',
  width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.titleMedium,
    color: MD3Colors.onSurface,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: MD3Colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
