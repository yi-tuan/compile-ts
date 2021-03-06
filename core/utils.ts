export function isAlpha(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

export function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

export function isBlank(ch: string): boolean {
  return ch == " " || ch == "\t" || ch == "\n";
}
