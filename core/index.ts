import { Parser, print } from './parser';
import { tokenizer } from './tokenizer';

console.log(print(new Parser(tokenizer('3 * 6 * (3 + 4 / 6) + 1 + 2')).parse(), ''));