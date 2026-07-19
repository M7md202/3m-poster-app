export interface RssItem {
  title: string;
  link: string;
  description: string;
  guid: string;
  pubDate: string;
}

export function parseRssFeed(xmlText: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const guid = extractTag(itemXml, 'guid');
    const pubDate = extractTag(itemXml, 'pubDate');
    if (title) {
      items.push({ title, link, description, guid, pubDate });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const match = xml.match(regex);
  if (match) return match[1].trim();
  const simpleRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const simpleMatch = xml.match(simpleRegex);
  return simpleMatch ? simpleMatch[1].trim() : '';
}

export function hasNewItems(items: RssItem[], lastGuid: string | null): RssItem[] {
  if (!lastGuid) return items;
  const idx = items.findIndex(i => i.guid === lastGuid);
  if (idx === -1) return items;
  return items.slice(0, idx);
}

export function rssItemToPostContent(item: RssItem): string {
  const desc = item.description
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

  return `${item.title}\n\n${desc}\n\nRead more: ${item.link}`;
}
