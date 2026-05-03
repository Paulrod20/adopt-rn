export function decodeHtmlEntities(text: string): string {
    return text
      .replace(/&#226;€™/g, "'")
      .replace(/&#226;€œ/g, '"')
      .replace(/&#226;€/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
}
  