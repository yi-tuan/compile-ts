import { AstNode, Parser } from "./parser";
import { tokenizer } from "./tokenizer";

export function print(node: AstNode, indent: string) {
  if (node.children) {
    for (const child of node.children) {
      console.log(indent + child.value.type + ":" + child.value.value);
      print(child, indent + "\t");
    }
  }
}

print(new Parser(tokenizer("1 + 2 * 3")).parse(), " ");
