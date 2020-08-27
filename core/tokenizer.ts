import { isBlank, isDigit, isAlpha } from './utils';

export enum Token {
  Root = "Root",
  VariableDeclaration = 'VariableDeclaration',       // 变量申明关键字
  Identifier = 'Identifier',                         // 变量字
  NumericLiteral = 'NumericLiteral',                 // 数字
  StringLiteral = 'StringLiteral',                   // 字符串
  GreaterThanToken = 'GreaterThanToken',             // >
  GreaterThanEqualsToken = 'GreaterThanEqualsToken', // >=
  LessThanToken = 'LessThanToken',                   // <
  LessThanEqualsToken = 'LessThanEqualsToken',       // <=
  EqualsToken = 'EqualsToken',                       // =
  PlusToken = 'PlusToken',                           // +
  MinusToken = 'MinusToken',                         // -
  AsteriskToken = 'AsteriskToken',                   // *
  SlashToken = 'SlashToken',                         // /
  SemiColon = 'SemiColon',                           // ;
  LeftParen = 'LeftParen',                           // (
  RightParen = 'RightParen',                         // )
}

export interface NodeItem {
  type: Token;
  value: string;
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
        type: Token.NumericLiteral,
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

      tokens.push({ type: Token.Identifier, value });
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
    
      tokens.push({ type: Token.StringLiteral, value });

      continue;
    }

    if (char === '+') {
      tokens.push({ type: Token.PlusToken, value: char });
      current++;
      continue;
    }

    if (char === '-') {
      tokens.push({ type: Token.MinusToken, value: char });
      current++;
      continue;
    }

    if (char === '*') {
      tokens.push({ type: Token.AsteriskToken, value: char });
      current++;
      continue;
    }

    if (char === '/') {
      tokens.push({ type: Token.SlashToken, value: char });
      current++;
      continue;
    }

    if (char === ';') {
      tokens.push({ type: Token.SemiColon, value: char });
      current++;
      continue;
    }

    if (char === '(') {
      tokens.push({ type: Token.LeftParen, value: char });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: Token.RightParen, value: char });
      current++;
      continue;
    }

    if (char === '=') {
      tokens.push({ type: Token.EqualsToken, value: char });
      current++;
      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}