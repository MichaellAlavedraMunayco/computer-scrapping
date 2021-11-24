export function extractNumbers(text: string): string | null {
  return text ? text.replace(/[^\d\.]*/g, '') : null;
}