export function parseSpintax(text: string): string {
  const regex = /\{([^{}]+)\}/g;
  let result = text;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(result)) !== null) {
    const options = match[1].split('|');
    const chosen = options[Math.floor(Math.random() * options.length)];
    result = result.slice(0, match.index) + chosen + result.slice(match.index + match[0].length);
    regex.lastIndex = match.index;
  }

  return result;
}

const EMOJIS = ['😀', '😍', '🚀', '💪', '🔥', '⭐', '👍', '🎉', '✨', '🙌', '💯', '✅', '📢', '🎯', '💎'];

export function applyPlaceholders(
  text: string,
  context: {
    groupName?: string;
    accountName?: string;
  }
): string {
  const now = new Date();
  let result = text;

  result = result.replace(/\{group_name\}/g, context.groupName || 'Group');
  result = result.replace(/\{account_name\}/g, context.accountName || 'Account');
  result = result.replace(/\{date\}/g, now.toLocaleDateString());
  result = result.replace(/\{time\}/g, now.toLocaleTimeString());
  result = result.replace(/\{random_number\}/g, String(Math.floor(Math.random() * 99999)));
  result = result.replace(/\{random_emoji\}/g, EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

  return result;
}

export function processPostContent(
  text: string,
  context: { groupName?: string; accountName?: string }
): string {
  const spintaxed = parseSpintax(text);
  return applyPlaceholders(spintaxed, context);
}

export function getPlaceholderList(): { tag: string; description: string }[] {
  return [
    { tag: '{group_name}', description: 'Name of the target group' },
    { tag: '{account_name}', description: 'Name of the posting account' },
    { tag: '{date}', description: 'Current date' },
    { tag: '{time}', description: 'Current time' },
    { tag: '{random_number}', description: 'Random number (0-99999)' },
    { tag: '{random_emoji}', description: 'Random emoji' },
  ];
}
