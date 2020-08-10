import { isAlpha, isDigit, isBlank, TokenReader } from './utils';

enum State {
  Init,
  Identifier,
  NumericLiteral,
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
  tokenType: State;
  tokenText: string;
}

let tokens: Token[] = [];
let tokenType: State | null = null;
let tokenText: string[] = [];

function initToken(ch: string): State {
  if (tokenText.length) {
    tokens.push({
      tokenType: tokenType as State,
      tokenText: tokenText.toString(),
    });

    tokenType = null;
    tokenText = [];
  }

  let newState = State.Init;
  if (isAlpha(ch)) {              //第一个字符是字母
    tokenType = State.Identifier;
    tokenText.push(ch);
  } else if (isDigit(ch)) {       //第一个字符是数字
    newState = State.NumericLiteral;
    tokenType = State.NumericLiteral;
    tokenText.push(ch);
  } else if (ch == '>') {         //第一个字符是>
    newState = State.GreaterThanToken;
    tokenType = State.GreaterThanToken;
    tokenText.push(ch);
  } else if (ch == '+') {
    newState = State.PlusToken;
    tokenType = State.PlusToken;
    tokenText.push(ch);
  } else if (ch == '-') {
    newState = State.MinusToken;
    tokenType = State.MinusToken;
    tokenText.push(ch);
  } else if (ch == '*') {
    newState = State.AsteriskToken;
    tokenType = State.AsteriskToken;
    tokenText.push(ch);
  } else if (ch == '/') {
    newState = State.SlashToken;
    tokenType = State.SlashToken;
    tokenText.push(ch);
  } else if (ch == ';') {
    newState = State.SemiColon;
    tokenType = State.SemiColon;
    tokenText.push(ch);
  } else if (ch == '(') {
    newState = State.LeftParen;
    tokenType = State.LeftParen;
    tokenText.push(ch);
  } else if (ch == ')') {
    newState = State.RightParen;
    tokenType = State.RightParen;
    tokenText.push(ch);
  } else if (ch == '=') {
    newState = State.EqualsToken;
    tokenType = State.EqualsToken;
    tokenText.push(ch);
  } else {
    newState = State.Init; // skip all unknown patterns
  }

  return newState
}

export function tokenize(code: string) {
  let state = State.Init;
  let ich: string;

  for (let ch of code.split('')) {
    ich = ch;

    switch (state) {
      case State.Identifier: {
        if (isAlpha(ch) && isDigit(ch)) {
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case State.NumericLiteral: {
        if (isDigit(ch)) {
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case State.GreaterThanToken: {
        if ("=" === ch) {
          tokenType = State.GreaterThanEqualsToken;
          state = State.GreaterThanEqualsToken;
          tokenText.push(ch);
        } else {
          state = initToken(ch);
        }
        break;
      }
      case State.LessThanToken: {
        if ("=" === ch) {
          tokenText.push(ch);
          tokenType = State.LessThanEqualsToken;
          state = State.LessThanEqualsToken;
        } else {
          state = initToken(ch);
        }
        break;
      }
      case State.Init:
      case State.GreaterThanEqualsToken:
      case State.LessThanEqualsToken:
      case State.EqualsToken:
      case State.PlusToken:
      case State.MinusToken:
      case State.AsteriskToken:
      case State.SlashToken:
      case State.SemiColon:
      case State.LeftParen:
      case State.RightParen: {
        state = initToken(ch);
        break;
      }
    }
  }

  if (tokenText.length) {
    initToken(ich!);
  }

  return new TokenReader(tokens);
}


