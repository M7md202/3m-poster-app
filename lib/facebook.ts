import type { FbGroup, ApprovalType, ActivityLevel, PrivacyType } from '@/types/database';

export interface ScrapedGroup {
  fbGroupId: string;
  name: string;
  memberCount: number;
  privacyType: PrivacyType;
  approvalType: ApprovalType;
  activityLevel: ActivityLevel;
}

export function parseGroupsHtml(html: string): ScrapedGroup[] {
  const groups: ScrapedGroup[] = [];
  const groupLinkRegex = /\/groups\/(\d+)[^"]*"[^>]*>([^<]+)</g;
  let match: RegExpExecArray | null;

  while ((match = groupLinkRegex.exec(html)) !== null) {
    const fbGroupId = match[1];
    const name = match[2].trim();
    if (fbGroupId && name) {
      const memberCount = parseMemberCount(html, match.index);
      const approvalType: ApprovalType = html.slice(match.index, match.index + 500).includes('Admin') ? 'admin_approval' : 'open';
      const activityLevel = determineActivity(memberCount);
      const privacyType: PrivacyType = html.slice(match.index, match.index + 500).toLowerCase().includes('private') ? 'private' : 'public';

      groups.push({ fbGroupId, name, memberCount, privacyType, approvalType, activityLevel });
    }
  }

  const seen = new Set<string>();
  return groups.filter(g => {
    if (seen.has(g.fbGroupId)) return false;
    seen.add(g.fbGroupId);
    return true;
  });
}

function parseMemberCount(html: string, offset: number): number {
  const nearby = html.slice(offset, offset + 500);
  const memberMatch = nearby.match(/(\d+(?:[,\d]*))\s*(?:members?|أعضاء|عضو)/i);
  if (memberMatch) {
    return parseInt(memberMatch[1].replace(/,/g, ''), 10) || 0;
  }
  const kMatch = nearby.match(/(\d+(?:\.\d+)?)\s*[Kk]/);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }
  return 0;
}

function determineActivity(memberCount: number): ActivityLevel {
  if (memberCount > 50000) return 'high';
  if (memberCount > 5000) return 'medium';
  return 'low';
}

export function buildCookieHeader(cookies: { c_user?: string; xs?: string }): string {
  const parts: string[] = [];
  if (cookies.c_user) parts.push(`c_user=${cookies.c_user}`);
  if (cookies.xs) parts.push(`xs=${cookies.xs}`);
  return parts.join('; ');
}

export function filterGroups(
  groups: ScrapedGroup[],
  filters: {
    approvalType?: ApprovalType | 'all';
    minMembers?: number;
    maxMembers?: number;
    activityLevel?: ActivityLevel | 'all';
  }
): ScrapedGroup[] {
  return groups.filter(g => {
    if (filters.approvalType && filters.approvalType !== 'all' && g.approvalType !== filters.approvalType) return false;
    if (filters.minMembers && g.memberCount < filters.minMembers) return false;
    if (filters.maxMembers && g.memberCount > filters.maxMembers) return false;
    if (filters.activityLevel && filters.activityLevel !== 'all' && g.activityLevel !== filters.activityLevel) return false;
    return true;
  });
}

export function getRandomInterval(minMin: number, maxMin: number): number {
  const minMs = minMin * 60 * 1000;
  const maxMs = maxMin * 60 * 1000;
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

export function formatMemberCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return String(count);
}
