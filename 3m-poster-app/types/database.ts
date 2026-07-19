export type AccountStatus = 'active' | 'paused' | 'banned' | 'cooldown';
export type CampaignStatus = 'draft' | 'running' | 'paused' | 'completed' | 'scheduled';
export type LogStatus = 'pending' | 'success' | 'failed' | 'skipped';
export type ApprovalType = 'open' | 'admin_approval';
export type PrivacyType = 'public' | 'private';
export type ActivityLevel = 'high' | 'medium' | 'low';
export type ProxyType = 'http' | 'socks5' | 'socks4';
export type QueueStatus = 'queued' | 'posting' | 'posted' | 'failed' | 'cancelled';

export interface FbAccount {
  id: string;
  name: string;
  email: string | null;
  cookies_encrypted: string;
  status: AccountStatus;
  daily_post_count: number;
  daily_limit: number;
  proxy_id: string | null;
  last_post_at: string | null;
  created_at: string;
}

export interface FbGroup {
  id: string;
  account_id: string | null;
  fb_group_id: string | null;
  name: string;
  member_count: number;
  privacy_type: PrivacyType;
  approval_type: ApprovalType;
  activity_level: ActivityLevel;
  folder_id: string | null;
  last_scraped_at: string | null;
  created_at: string;
  group_score: number;
  approval_speed_hours: number;
  engagement_rate: number;
  deletion_count: number;
}

export interface PostTemplate {
  id: string;
  name: string;
  content: string;
  media_urls: string[];
  created_at: string;
  updated_at: string;
  watermark_text: string | null;
  watermark_enabled: boolean;
  strip_metadata: boolean;
  first_comment_link: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  account_ids: string[];
  group_folder_ids: string[];
  template_id: string | null;
  schedule_interval_min: number;
  schedule_interval_max: number;
  daily_limit_per_account: number;
  anti_ban_settings: AntiBanSettings;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  first_comment_link: string | null;
  auto_comment_enabled: boolean;
  auto_reply_comment: string | null;
  auto_bump_enabled: boolean;
  auto_bump_interval_min: number;
  auto_bump_text: string | null;
  rss_feed_id: string | null;
  ab_test_enabled: boolean;
  sequence_enabled: boolean;
}

export interface AntiBanSettings {
  humanScroll: boolean;
  scrollDuration: number;
  randomDelay: boolean;
  rotateProxy: boolean;
}

export interface CampaignLog {
  id: string;
  campaign_id: string | null;
  account_id: string | null;
  group_id: string | null;
  status: LogStatus;
  error_message: string | null;
  posted_at: string | null;
  post_url: string | null;
  deleted_detected: boolean;
  created_at: string;
}

export interface Proxy {
  id: string;
  name: string;
  type: ProxyType;
  host: string;
  port: number;
  username: string | null;
  password: string | null;
  enabled: boolean;
  created_at: string;
}

export interface GroupFolder {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface DmFunnelRule {
  id: string;
  campaign_id: string;
  keywords: string[];
  auto_reply_comment: string | null;
  dm_message: string;
  enabled: boolean;
  created_at: string;
}

export interface AutoBumpConfig {
  id: string;
  campaign_id: string;
  enabled: boolean;
  bump_interval_min: number;
  bump_text: string;
  delete_previous_bump: boolean;
  max_bumps_per_post: number;
  created_at: string;
}

export interface PostMonitoring {
  id: string;
  campaign_log_id: string | null;
  post_url: string | null;
  is_deleted: boolean;
  is_shadowbanned: boolean;
  last_checked_at: string | null;
  check_count: number;
  visibility_score: number;
  created_at: string;
}

export interface SequenceStep {
  id: string;
  campaign_id: string;
  step_number: number;
  template_id: string | null;
  day_offset: number;
  created_at: string;
}

export interface RssFeed {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  last_fetched_at: string | null;
  last_item_guid: string | null;
  auto_post: boolean;
  campaign_id: string | null;
  created_at: string;
}

export interface AbTestVariant {
  id: string;
  campaign_id: string;
  template_id: string;
  variant_label: string;
  post_count: number;
  engagement_count: number;
  created_at: string;
}

export interface SmartQueueItem {
  id: string;
  campaign_id: string | null;
  template_id: string | null;
  account_id: string | null;
  group_id: string | null;
  scheduled_time: string | null;
  status: QueueStatus;
  queue_order: number;
  created_at: string;
}

export interface AppSecuritySettings {
  id: string;
  stealth_mode: boolean;
  hide_notifications: boolean;
  hide_from_recents: boolean;
  camouflage_icon: boolean;
  biometric_lock: boolean;
  pin_code: string | null;
  watermark_default_text: string | null;
  watermark_default_enabled: boolean;
  strip_metadata_default: boolean;
  auto_export_reports: boolean;
  export_format: string;
  updated_at: string;
}
