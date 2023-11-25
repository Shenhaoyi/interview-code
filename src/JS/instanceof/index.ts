/* 实现 instanceof 操作符 */
export function instanceOf(obj: Record<string, any>, constructor: Record<string, any>) {
  const prototype = constructor.prototype;
  let current = obj;
  while (current /* 原型链的根为 null，所以能跳出循环 */) {
    if (current === prototype) return true;
    else current = Object.getPrototypeOf(current);
  }
  return false;
}
