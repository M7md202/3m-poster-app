import type { AppSecuritySettings } from '@/types/database';

export const DEFAULT_SECURITY_SETTINGS: AppSecuritySettings = {
  id: '',
  stealth_mode: false,
  hide_notifications: false,
  hide_from_recents: false,
  camouflage_icon: false,
  biometric_lock: false,
  pin_code: null,
  watermark_default_text: null,
  watermark_default_enabled: false,
  strip_metadata_default: false,
  auto_export_reports: false,
  export_format: 'csv',
  updated_at: new Date().toISOString(),
};

export function isStealthActive(settings: AppSecuritySettings): boolean {
  return settings.stealth_mode || settings.hide_from_recents || settings.camouflage_icon;
}

export function getAppDisplayName(settings: AppSecuritySettings): string {
  return settings.camouflage_icon ? 'Calculator' : '3M Poster FB';
}

export function shouldShowNotifications(settings: AppSecuritySettings): boolean {
  return !settings.stealth_mode && !settings.hide_notifications;
}

export function validatePinCode(pin: string): boolean {
  return /^\d{4,6}$/.test(pin);
}

export function maskPin(pin: string): string {
  return '•'.repeat(pin.length);
}
