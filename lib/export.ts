import type { CampaignLog, Campaign } from '@/types/database';

export function generateCSV(logs: CampaignLog[], campaignName?: string): string {
  const headers = ['Date', 'Campaign', 'Account ID', 'Group ID', 'Status', 'Error', 'Post URL', 'Deleted'];
  const rows = logs.map(log => [
    new Date(log.created_at).toISOString(),
    campaignName || log.campaign_id || '',
    log.account_id || '',
    log.group_id || '',
    log.status,
    log.error_message || '',
    log.post_url || '',
    log.deleted_detected ? 'Yes' : 'No',
  ]);

  const escapeCSV = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const csv = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(c => escapeCSV(String(c))).join(',')),
  ].join('\n');

  return csv;
}

export function generateCampaignSummaryCSV(
  campaigns: Campaign[],
  logs: CampaignLog[]
): string {
  const headers = ['Campaign Name', 'Status', 'Total Posts', 'Success', 'Failed', 'Pending', 'Success Rate %'];
  const rows = campaigns.map(camp => {
    const campLogs = logs.filter(l => l.campaign_id === camp.id);
    const total = campLogs.length;
    const success = campLogs.filter(l => l.status === 'success').length;
    const failed = campLogs.filter(l => l.status === 'failed').length;
    const pending = campLogs.filter(l => l.status === 'pending').length;
    const rate = total > 0 ? Math.round((success / total) * 100) : 0;
    return [camp.name, camp.status, String(total), String(success), String(failed), String(pending), String(rate)];
  });

  const escapeCSV = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  return [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(c => escapeCSV(String(c))).join(',')),
  ].join('\n');
}

export function downloadCSV(csvContent: string, filename: string): void {
  if (typeof document !== 'undefined') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function generatePDFHTML(
  logs: CampaignLog[],
  campaignName: string
): string {
  const success = logs.filter(l => l.status === 'success').length;
  const failed = logs.filter(l => l.status === 'failed').length;
  const pending = logs.filter(l => l.status === 'pending').length;
  const total = logs.length;
  const rate = total > 0 ? Math.round((success / total) * 100) : 0;

  const rows = logs.map(log => `
    <tr>
      <td>${new Date(log.created_at).toLocaleString()}</td>
      <td>${log.status}</td>
      <td>${log.error_message || '-'}</td>
      <td>${log.post_url || '-'}</td>
      <td>${log.deleted_detected ? 'Yes' : 'No'}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${campaignName} - Campaign Report</title>
<style>
  body { font-family: Arial, sans-serif; padding: 40px; color: #1a1c1e; }
  h1 { color: #1a73e8; }
  .summary { display: flex; gap: 20px; margin: 20px 0; }
  .stat { background: #f1f3f6; padding: 16px 24px; border-radius: 12px; }
  .stat-value { font-size: 28px; font-weight: bold; }
  .stat-label { font-size: 12px; color: #666; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th { background: #1a73e8; color: white; padding: 10px; text-align: left; font-size: 13px; }
  td { padding: 8px 10px; border-bottom: 1px solid #e0e0e0; font-size: 13px; }
  .success { color: #2e7d32; font-weight: bold; }
  .failed { color: #ba1a1a; font-weight: bold; }
  .pending { color: #ed6c02; font-weight: bold; }
</style>
</head>
<body>
  <h1>Campaign Report: ${campaignName}</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  <div class="summary">
    <div class="stat"><div class="stat-value">${total}</div><div class="stat-label">Total Posts</div></div>
    <div class="stat"><div class="stat-value success">${success}</div><div class="stat-label">Success</div></div>
    <div class="stat"><div class="stat-value failed">${failed}</div><div class="stat-label">Failed</div></div>
    <div class="stat"><div class="stat-value pending">${pending}</div><div class="stat-label">Pending</div></div>
    <div class="stat"><div class="stat-value">${rate}%</div><div class="stat-label">Success Rate</div></div>
  </div>
  <table>
    <thead>
      <tr><th>Date</th><th>Status</th><th>Error</th><th>Post URL</th><th>Deleted</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>
  `.trim();
}

export function openPDFReport(htmlContent: string): void {
  if (typeof window !== 'undefined') {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(htmlContent);
      win.document.close();
    }
  }
}
