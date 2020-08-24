export function isUrl(input: string): boolean {
  return /^http/.test(input);
}
