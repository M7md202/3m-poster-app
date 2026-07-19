import { TextInput, StyleSheet, View, Text } from 'react-native';
import { MD3Colors, BorderRadius, Spacing, Typography } from '@/lib/theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  style,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.multiline, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MD3Colors.outline}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.labelMedium,
    color: MD3Colors.onSurfaceVariant,
    marginBottom: Spacing.xs + 2,
  },
  input: {
    ...Typography.bodyLarge,
    backgroundColor: MD3Colors.surfaceContainerHigh,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    color: MD3Colors.onSurface,
    borderWidth: 1,
    borderColor: MD3Colors.outlineVariant,
    minHeight: 48,
  },
  multiline: {
    minHeight: 120,
    paddingTop: Spacing.sm + 2,
  },
});
