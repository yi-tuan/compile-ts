import {Token} from './lexer';

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


export class TokenReader {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public unRead() {
    if (this.pos > 0) {
      this.pos -= 1;
    }
  }

  public read(): Token {
    this.pos += 1;
    return this.peek();
  }

  public peek(): Token {
    return this.tokens[this.pos];
  }

  public setPos(pos: number): void {
    this.pos = pos;
  }

  public getPos(): number {
    return this.pos;
  }
}