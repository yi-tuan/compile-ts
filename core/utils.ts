//是否是字母
export function isAlpha(ch: string): boolean {
  return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
}

//是否是数字
export function isDigit(ch: string): boolean {
  return ch >= '0' && ch <= '9';
}

//是否是空白字符
export function isBlank(ch: string): boolean {
  return ch == ' ' || ch == '\t' || ch == '\n';
}