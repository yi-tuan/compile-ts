import { NodeItem, Token } from './tokenizer';
import { TokenReader } from './utils';

class AstNode {
  value: NodeItem;
  children: AstNode[] = [];
  parent: AstNode | null = null;

  constructor(value: NodeItem) {
    this.value = value;
  }

  public addChild(child: AstNode) {
    child.parent = this;
    this.children.push(child);
  }
}

/**
 * 语法解析：乘法表达式
 */
function multiplicative(tokens: TokenReader): AstNode | null {
  let child1 = primary(tokens);
  let node = child1;
  let token = tokens.peek();

  if (child1 != null && token != null) {
    if (token.type === Token.SlashToken || token.type === Token.AsteriskToken) {
      token = tokens.read();
      let child2 = multiplicative(tokens);

      if (child2 != null) {
        node = new AstNode(token);
        node.addChild(child1);
        node.addChild(child2);
      } else {
        throw new Error("invalid multiplicative expression, expecting the right part.");
      }
    }
  }

  return node;
}

/**
 * 语法解析：加法表达式
 */
function additive(tokens: TokenReader): AstNode | null {
  let child1 = multiplicative(tokens);
  let node = child1;
  let token = tokens.peek();

  if (child1 != null && token != null) {
    if (token.type === Token.PlusToken || token.type === Token.MinusToken) {
      token = tokens.read();
      let child2 = additive(tokens);


      if (child2 != null) {
        node = new AstNode(token);
        node.addChild(child1);
        node.addChild(child2);
      } else {
        throw new Error("invalid additive expression, expecting the right part.");
      }
    }
  }

  return node;
}

function primary(tokens: TokenReader) {
  let node: AstNode | null = null;
  let token = tokens.peek();

  if (token != null) {
    if (token.type === Token.NumericLiteral) {
      node = new AstNode(tokens.read())
    }

    if (token.type === Token.LeftParen) {
      tokens.read();
      node = additive(tokens);

      if (node != null) {
        token = tokens.peek();
        
        if (token != null && token.type === Token.RightParen) {
          token = tokens.read();
        } else {
          throw new Error("expecting right parenthesis");
        }
      } else {
        throw new Error("expecting an additive expression inside parenthesis");
      }
    }
  }

  return node;
}

export function parser(tokens: NodeItem[]) {
  let node = new AstNode({
    type: Token.Root,
    value: "Root"
  })
  let child = additive(new TokenReader(tokens));

  if (child != null) {
    node.addChild(child);
}

  return node;
}
