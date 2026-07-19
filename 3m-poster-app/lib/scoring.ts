import type { FbGroup } from '@/types/database';

export interface GroupScoreInput {
  approvalSpeedHours: number;
  engagementRate: number;
  deletionCount: number;
  memberCount: number;
  activityLevel: 'high' | 'medium' | 'low';
}

export function calculateGroupScore(input: GroupScoreInput): number {
  let score = 50;

  // Approval speed: faster = better (max 25 points)
  if (input.approvalSpeedHours > 0 && input.approvalSpeedHours <= 1) score += 25;
  else if (input.approvalSpeedHours <= 6) score += 20;
  else if (input.approvalSpeedHours <= 24) score += 10;
  else if (input.approvalSpeedHours > 24) score -= 5;

  // Engagement rate: higher = better (max 20 points)
  if (input.engagementRate > 10) score += 20;
  else if (input.engagementRate > 5) score += 15;
  else if (input.engagementRate > 2) score += 10;
  else if (input.engagementRate > 0.5) score += 5;

  // Deletion count: more deletions = worse (max -20 points)
  if (input.deletionCount === 0) score += 10;
  else if (input.deletionCount <= 2) score -= 5;
  else if (input.deletionCount <= 5) score -= 15;
  else score -= 20;

  // Member count: bigger = slightly better (max 10 points)
  if (input.memberCount > 50000) score += 10;
  else if (input.memberCount > 10000) score += 7;
  else if (input.memberCount > 1000) score += 4;

  // Activity level bonus
  if (input.activityLevel === 'high') score += 5;
  else if (input.activityLevel === 'medium') score += 2;

  return Math.max(0, Math.min(100, score));
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excellent', color: '#2E7D32' };
  if (score >= 60) return { label: 'Good', color: '#1A73E8' };
  if (score >= 40) return { label: 'Average', color: '#ED6C02' };
  if (score >= 20) return { label: 'Poor', color: '#F59E0B' };
  return { label: 'Risky', color: '#BA1A1A' };
}

export function getScoreColor(score: number): string {
  return getScoreLabel(score).color;
}

export function rankGroupsByScore(groups: FbGroup[]): FbGroup[] {
  return [...groups].sort((a, b) => (b.group_score || 0) - (a.group_score || 0));
}
