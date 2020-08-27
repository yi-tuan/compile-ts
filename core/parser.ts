import { NodeItem, Token } from './tokenizer';

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

export function print(node: AstNode, indent: string) {
  console.log("node:", node.value);
  console.log(indent + node.value.type + ":" + node.value.value)

  if (node.children) {
    for (const child of node.children) {
      print(child, indent + "\t");
    }
  }
}

export class Parser {
  private pos: number = 0;
  private tokens: NodeItem[];

  constructor(tokens: NodeItem[]) {
    console.log("tokens:", tokens);
    this.tokens = tokens;
  }

  public parse() {
    const node = new AstNode({
      type: Token.Root,
      value: "Root"
    })
    const child = this.walkAdditive();

    if (child != null) {
      node.addChild(child);
    }

    return node;
  }

  /**
  * 语法解析：乘法表达式
  */
  private walkMultiplicative(): AstNode | null {
    let child1 = this.walkPrimary();
    let node = child1;
    let token = this.peek();

    if (child1 != null && token != null) {
      if (token.type === Token.SlashToken || token.type === Token.AsteriskToken) {
        token = this.read();
        let child2 = this.walkMultiplicative();

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
  private walkAdditive(): AstNode | null {
    let child1 = this.walkMultiplicative();
    let node = child1;

    if (child1 != null) {
      while (true) {
        let token = this.peek();

        if (token != null && (token.type === Token.PlusToken || token.type === Token.MinusToken)) {
          token = this.read();
          let child2 = this.walkMultiplicative();
          node = new AstNode(token);
          node.addChild(child1);
          node.addChild(child2);
          child1 = node;
        } else {
          break;
        }
      }
    }

    return node;
  }

  /**
   * 语法解析：基础表达式
   */
  private walkPrimary() {
    let node: AstNode | null = null;
    let token = this.peek();

    if (token != null) {
      if (token.type === Token.NumericLiteral) {
        node = new AstNode(this.read())
      }

      if (token.type === Token.LeftParen) {
        this.read();
        node = this.walkAdditive();

        if (node != null) {
          token = this.peek();

          if (token != null && token.type === Token.RightParen) {
            token = this.read();
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

  private read(): NodeItem {
    this.pos += 1;
    return this.peek();
  }

  private peek(): NodeItem | null {
    if (this.pos > this.tokens.length) {
      return null;
    }

    return this.tokens[this.pos];
  }
}
