import { IBase } from "../interfaces/IBase";
export function searchQuery<T extends IBase>(
  model: Omit<T, "firstResult" | "maxResult" | "sort">
) {
  let queryArray: any = [];
  Object.keys(model).forEach((key: string) => {
    queryArray.push({
      [key]: model[key as keyof Omit<T, "firstResult" | "maxResult" | "sort">],
    });
  });
  return queryArray as Partial<T>[];
}
