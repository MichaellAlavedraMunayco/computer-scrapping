export function decodeUTF8(text: string): string | null {
  return text ? decodeURIComponent(escape(text)) : null;
}