import { parser } from './parser';
import { tokenizer } from './tokenizer';

console.log(parser(tokenizer('1 + 2 + 3 * 6')));