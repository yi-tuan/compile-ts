import { isAlpha, isDigit } from '../utils';

enum TokenType {
  Init,
  VariableDeclaration,    // 变量申明关键字
  Identifier,             // 变量字
  NumericLiteral,         // 数字
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

export interface Token {
  type: TokenType;
  text: string;
}

let tokens: Token[] = [];
let tokenType: TokenType | null = null;
let tokenText: string[] = [];

function initToken(ch: string): TokenType {
  if (tokenText.length) {
    tokens.push({
      type: tokenType as TokenType,
      text: tokenText.toString(),
    });

    tokenType = null;
    tokenText = [];
  }

  let newState = TokenType.Init;
  if (isAlpha(ch)) {              //第一个字符是字母
    tokenType = TokenType.Identifier;
    tokenText.push(ch);
  } else if (isDigit(ch)) {       //第一个字符是数字
    newState = TokenType.NumericLiteral;
    tokenType = TokenType.NumericLiteral;
    tokenText.push(ch);
  } else if (ch == '>') {         //第一个字符是>
    newState = TokenType.GreaterThanToken;
    tokenType = TokenType.GreaterThanToken;
    tokenText.push(ch);
  } else if (ch == '+') {
    newState = TokenType.PlusToken;
    tokenType = TokenType.PlusToken;
    tokenText.push(ch);
  } else if (ch == '-') {
    newState = TokenType.MinusToken;
    tokenType = TokenType.MinusToken;
    tokenText.push(ch);
  } else if (ch == '*') {
    newState = TokenType.AsteriskToken;
    tokenType = TokenType.AsteriskToken;
    tokenText.push(ch);
  } else if (ch == '/') {
    newState = TokenType.SlashToken;
    tokenType = TokenType.SlashToken;
    tokenText.push(ch);
  } else if (ch == ';') {
    newState = TokenType.SemiColon;
    tokenType = TokenType.SemiColon;
    tokenText.push(ch);
  } else if (ch == '(') {
    newState = TokenType.LeftParen;
    tokenType = TokenType.LeftParen;
    tokenText.push(ch);
  } else if (ch == ')') {
    newState = TokenType.RightParen;
    tokenType = TokenType.RightParen;
    tokenText.push(ch);
  } else if (ch == '=') {
    newState = TokenType.EqualsToken;
    tokenType = TokenType.EqualsToken;
    tokenText.push(ch);
  } else {
    newState = TokenType.Init; // skip all unknown patterns
  }

  return newState
}

export function tokenize(code: string) {
  let state = TokenType.Init;
  let ich: string;

  for (let ch of code.split('')) {
    ich = ch;

    switch (state) {
      case TokenType.Identifier: {
        if (isAlpha(ch) && isDigit(ch)) {
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case TokenType.NumericLiteral: {
        if (isDigit(ch)) {
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case TokenType.GreaterThanToken: {
        if ("=" === ch) {
          tokenType = TokenType.GreaterThanEqualsToken;
          state = TokenType.GreaterThanEqualsToken;
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case TokenType.LessThanToken: {
        if ("=" === ch) {
          tokenText.push(ch);
          tokenType = TokenType.LessThanEqualsToken;
          state = TokenType.LessThanEqualsToken;
        } else {
          state = initToken(ch);
        }
        break;
      }
      case TokenType.Init:
      case TokenType.GreaterThanEqualsToken:
      case TokenType.LessThanEqualsToken:
      case TokenType.EqualsToken:
      case TokenType.PlusToken:
      case TokenType.MinusToken:
      case TokenType.AsteriskToken:
      case TokenType.SlashToken:
      case TokenType.SemiColon:
      case TokenType.LeftParen:
      case TokenType.RightParen: {
        state = initToken(ch);
        break;
      }
    }
  }

  if (tokenText.length) {
    initToken(ich!);
  }

  return tokens;
}


