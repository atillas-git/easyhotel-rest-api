import { Request } from "express";

export interface IRequestBase<T, SortLiterals> extends Request {
  t: T;
  firstResult: number;
  maxResult: number;
  sort: SortLiterals;
}
