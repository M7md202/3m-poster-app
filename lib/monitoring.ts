import type { CampaignLog, PostMonitoring } from '@/types/database';

export interface MonitoringResult {
  isDeleted: boolean;
  isShadowbanned: boolean;
  visibilityScore: number;
}

export function checkPostStatus(
  log: CampaignLog,
  monitoring: PostMonitoring | undefined
): MonitoringResult {
  if (log.deleted_detected) {
    return { isDeleted: true, isShadowbanned: false, visibilityScore: 0 };
  }

  if (monitoring) {
    return {
      isDeleted: monitoring.is_deleted,
      isShadowbanned: monitoring.is_shadowbanned,
      visibilityScore: monitoring.visibility_score,
    };
  }

  return { isDeleted: false, isShadowbanned: false, visibilityScore: 100 };
}

export function simulateShadowbanCheck(visibilityScore: number): {
  isShadowbanned: boolean;
  confidence: number;
} {
  // Simulate a secondary visibility check
  // In production, this would load the post URL in an incognito-like session
  // and check if the post is visible to public viewers
  const isShadowbanned = visibilityScore < 30;
  const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
  return { isShadowbanned, confidence };
}

export function getMonitoringAlert(
  monitoring: PostMonitoring
): { type: 'deleted' | 'shadowban' | 'healthy'; message: string } | null {
  if (monitoring.is_deleted) {
    return { type: 'deleted', message: 'Post was deleted by group admin!' };
  }
  if (monitoring.is_shadowbanned) {
    return { type: 'shadowban', message: 'Post may be shadowbanned - low visibility detected' };
  }
  if (monitoring.visibility_score < 50) {
    return { type: 'shadowban', message: `Low visibility score: ${monitoring.visibility_score}%` };
  }
  return null;
}

export function getDeletedPostsCount(monitoring: PostMonitoring[]): number {
  return monitoring.filter(m => m.is_deleted).length;
}

export function getShadowbannedCount(monitoring: PostMonitoring[]): number {
  return monitoring.filter(m => m.is_shadowbanned).length;
}
