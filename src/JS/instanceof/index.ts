/* 实现 instanceof 操作符 */
export function instanceOf(obj: Record<string, any>, constructor: Record<string, any>) {
  const target = constructor.prototype;
  let current = obj.__proto__;
  while (true) {
    if (current === target) {
      return true;
    } else if (current === null /* 原型链的根 */) {
      return false;
    } else {
      current = Object.getPrototypeOf(current);
    }
  }
}
