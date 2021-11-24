export function extractNumbers(text: string): string | null {
  return text ? text.replace(/\D/g, '') : null;
}