import { NodeItem, Token } from "./tokenizer";
export class AstNode {
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
export class Parser {
  private pos: number = 0;
  private tokens: NodeItem[];

  constructor(tokens: NodeItem[]) {
    this.tokens = tokens;
  }

  public parse() {
    const node = new AstNode({
      type: Token.Root,
      value: "Root",
    });
    const child = this.walkAdditive();

    if (child != null) {
      node.addChild(child);
    }

    return node;
  }

  /**
   * Syntax parsing：add expression
   */
  private walkAdditive(): AstNode | null {
    let child1 = this.walkMultiplicative();
    let node = child1;

    if (child1 != null) {
      while (true) {
        let token = this.peek();

        if (
          token != null &&
          (token.type === Token.PlusToken || token.type === Token.MinusToken)
        ) {
          this.read();
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
   * Syntax parsing：multiple expression
   */
  private walkMultiplicative(): AstNode | null {
    let child1 = this.walkPrimary();
    let node = child1;

    if (child1 != null) {
      while (true) {
        let token = this.peek();

        if (
          token != null &&
          (token.type === Token.SlashToken ||
            token.type === Token.AsteriskToken)
        ) {
          token = this.read();
          let child2 = this.walkPrimary();
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
   * Syntax parsing：basic expression
   *
   */
  private walkPrimary() {
    let node: AstNode | null = null;
    let token = this.peek();

    if (token != null) {
      switch (token.type) {
        case Token.NumericLiteral:
          node = new AstNode(this.read());
          break;
        case Token.LeftParen:
          this.read();
          node = this.walkAdditive();

          if (node != null) {
            token = this.peek();

            if (token != null && token.type === Token.RightParen) {
              this.read();
            } else {
              throw new Error("expecting right parenthesis");
            }
          } else {
            throw new Error(
              "expecting an additive expression inside parenthesis"
            );
          }
        default:
          break;
      }
    }

    return node;
  }

  /** read current value and consume */
  private read(): NodeItem {
    const value = this.peek();
    this.pos += 1;
    return value;
  }

  /** read current value, not consume */
  private peek(): NodeItem | null {
    if (this.pos > this.tokens.length) {
      return null;
    }

    return this.tokens[this.pos];
  }
}
