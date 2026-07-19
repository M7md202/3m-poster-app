import { parseSpintax } from '@/lib/spintax';
import type { DmFunnelRule } from '@/types/database';

export interface CommentTrigger {
  commentText: string;
  commenterName: string;
  commenterId: string;
}

export interface DmFunnelResult {
  shouldReply: boolean;
  replyComment: string | null;
  shouldSendDm: boolean;
  dmMessage: string | null;
  matchedRule: DmFunnelRule | null;
}

const DEFAULT_KEYWORDS_EN = ['price', 'details', 'cost', 'how much', 'info', 'interested'];
const DEFAULT_KEYWORDS_AR = ['بكام', 'تفاصيل', 'سعر', 'كم', 'معلومات', 'مهتم'];

export function getAllDefaultKeywords(): string[] {
  return [...DEFAULT_KEYWORDS_EN, ...DEFAULT_KEYWORDS_AR];
}

export function matchCommentToRule(
  comment: CommentTrigger,
  rules: DmFunnelRule[]
): DmFunnelResult {
  const text = comment.commentText.toLowerCase().trim();

  for (const rule of rules) {
    if (!rule.enabled) continue;
    for (const keyword of rule.keywords) {
      const kw = keyword.toLowerCase().trim();
      if (text.includes(kw)) {
        return {
          shouldReply: true,
          replyComment: rule.auto_reply_comment ? parseSpintax(rule.auto_reply_comment) : null,
          shouldSendDm: true,
          dmMessage: parseSpintax(rule.dm_message),
          matchedRule: rule,
        };
      }
    }
  }

  return {
    shouldReply: false,
    replyComment: null,
    shouldSendDm: false,
    dmMessage: null,
    matchedRule: null,
  };
}

export function createDefaultDmFunnel(campaignId: string): Partial<DmFunnelRule> {
  return {
    campaign_id: campaignId,
    keywords: getAllDefaultKeywords(),
    auto_reply_comment: 'Thanks for your interest! {Check your inbox|I sent you a DM|DM sent} 📩',
    dm_message: 'Hi! {Thanks for your interest|Great to hear from you}! Here are the {details|info} you requested:',
    enabled: true,
  };
}
