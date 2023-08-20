import {
  add as a,
  subtract as s,
  multiply as m,
  ceil as c,
  bignumber,
  number,
} from 'mathjs';

export const add = (x, y) => {
  return number(a(bignumber(x), bignumber(y)));
};

export const subtract = (x, y) => {
  return number(s(bignumber(x), bignumber(y)));
};

export const multiply = (x, y) => {
  return number(m(bignumber(x), bignumber(y)));
};

export const ceil = (x, y) => {
  return number(c(bignumber(x), bignumber(y)));
};
