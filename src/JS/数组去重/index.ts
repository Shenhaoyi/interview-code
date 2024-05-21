export function isPrimitive(value: unknown) {
  return (typeof value !== 'object' || value === null) && typeof value !== 'function';
}
export function isSame(value1: unknown, value2: unknown): boolean {
  if (isPrimitive(value1) && isPrimitive(value2)) {
    return value1 === value2 && Object.is(value1, value2);
  } else if (isPrimitive(value1) || isPrimitive(value2)) {
    return false;
  } else {
    const obj1 = value1 as { [key: string]: any };
    const obj2 = value2 as { [key: string]: any };
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!keys2.includes(key) || !isSame(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }
}
/*
  两个对象属性相同，值也相同，则认为是相同的
*/
export function unique<T>(array: T[]): T[] {
  const result: T[] = [];
  for (let value1 of array) {
    let hasSame = false;
    for (let value2 of result) {
      if (isSame(value1, value2)) {
        hasSame = true;
        break;
      }
    }
    if (!hasSame) result.push(value1);
  }
  return result;
}
