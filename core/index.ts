import { Parser, print } from './parser';
import { tokenizer } from './tokenizer';
// import { parse } from "@babel/parser";

console.log(print(new Parser(tokenizer('1 + 2 + 3 * 6 * (3 * 4 * 6)')).parse(), ''));
// console.log(parse('var a = 1 + 2 + 3;'));