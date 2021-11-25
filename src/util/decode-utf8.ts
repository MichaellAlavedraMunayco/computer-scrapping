export function decodeUTF8(text: string): string | null {
  return text ? decodeURIComponent(escape(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '')) : null;
}