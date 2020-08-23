import { isBlank, isDigit, isAlpha } from './utils';

enum TokenType {
  VariableDeclaration,    // 变量申明关键字
  Identifier,             // 变量字
  NumericLiteral,         // 数字
  StringLiteral,          // 字符串
  GreaterThanToken,       // >
  GreaterThanEqualsToken, // >=
  LessThanToken,          // <
  LessThanEqualsToken,    // <=
  EqualsToken,            // =
  PlusToken,              // +
  MinusToken,             // -
  AsteriskToken,          // *
  SlashToken,             // /
  SemiColon,              // ;
  LeftParen,              // (
  RightParen,             // )
}

export interface NodeItem {
  value: string;
  type: TokenType;
}


export function tokenizer(input: string) {
  let current = 0;
  let tokens: NodeItem[] = [];

  while (current < input.length) {
    let char = input[current];
    
    // skip to the next cycle
    if (isBlank(char)) {
      current++;
      continue;
    }

    // is number
    if (isDigit(char)) {
      let value = '';

      while (isDigit(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: TokenType.NumericLiteral,
        value
      })
      continue;
    }

    // is Identifier
    if (isAlpha(char)) {
      let value = '';

      while (isAlpha(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: TokenType.Identifier, value });
      continue;
    }

    if (char === '"') {
      let value = '';

      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];

      // do keyword filter
    
      tokens.push({ type: TokenType.StringLiteral, value });

      continue;
    }


    // if (char === ">" && ) {

    // }
    
    if (char === '+') {
      tokens.push({ type: TokenType.PlusToken, value: char });
      current++;
      continue;
    }

    if (char === '-') {
      tokens.push({ type: TokenType.MinusToken, value: char });
      current++;
      continue;
    }

    if (char === '*') {
      tokens.push({ type: TokenType.AsteriskToken, value: char });
      current++;
      continue;
    }

    if (char === '/') {
      tokens.push({ type: TokenType.SlashToken, value: char });
      current++;
      continue;
    }

    if (char === ';') {
      tokens.push({ type: TokenType.SemiColon, value: char });
      current++;
      continue;
    }

    if (char === '(') {
      tokens.push({ type: TokenType.LeftParen, value: char });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: TokenType.RightParen, value: char });
      current++;
      continue;
    }

    if (char === '=') {
      tokens.push({ type: TokenType.EqualsToken, value: char });
      current++;
      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}