import { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { MD3Colors, BorderRadius, Spacing, Typography } from '@/lib/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'tonal' | 'outlined' | 'text' | 'error';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'filled',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const sizeStyles = {
    small: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, fontSize: 13 },
    medium: { paddingVertical: Spacing.sm + 2, paddingHorizontal: Spacing.lg, fontSize: 14 },
    large: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, fontSize: 16 },
  };

  const variantStyles = {
    filled: { backgroundColor: MD3Colors.primary, borderWidth: 0 },
    tonal: { backgroundColor: MD3Colors.secondaryContainer, borderWidth: 0 },
    outlined: { backgroundColor: 'transparent', borderWidth: 1, borderColor: MD3Colors.outline },
    text: { backgroundColor: 'transparent', borderWidth: 0 },
    error: { backgroundColor: MD3Colors.error, borderWidth: 0 },
  };

  const textColors = {
    filled: MD3Colors.onPrimary,
    tonal: MD3Colors.onSecondaryContainer,
    outlined: MD3Colors.primary,
    text: MD3Colors.primary,
    error: MD3Colors.onError,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        variantStyles[variant],
        { paddingVertical: sizeStyles[size].paddingVertical, paddingHorizontal: sizeStyles[size].paddingHorizontal },
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: textColors[variant], fontSize: sizeStyles[size].fontSize }]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});
