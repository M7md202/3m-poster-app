import { ReactNode } from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableOpacity, Text, ScrollView, Pressable } from 'react-native';
import { MD3Colors, BorderRadius, Spacing, Typography } from '@/lib/theme';
import { X } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: number;
}

export function Modal({ visible, onClose, title, children, maxWidth = 520 }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.content, { maxWidth }]} onPress={(e) => e.stopPropagation()}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <X size={20} color={MD3Colors.onSurfaceVariant} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          )}
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  content: {
    backgroundColor: MD3Colors.surface,
    borderRadius: BorderRadius.xl,
    width: '100%',
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: MD3Colors.outlineVariant,
  },
  title: {
    ...Typography.titleMedium,
    color: MD3Colors.onSurface,
  },
  closeBtn: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  body: {
    padding: Spacing.lg,
  },
});
