export function isUrl(input: string): boolean {
  return /^http/.test(input);
}

export function isHtml(input: string): boolean {
  return /^<html/.test(input);
}
