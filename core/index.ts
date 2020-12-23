import { Parser, print } from './parser';
import { tokenizer } from './tokenizer';

print(new Parser(tokenizer('1 + 2 * 3')).parse(), ' ');