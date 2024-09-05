export function createProxy(value = 0) {
  return new Proxy({} as Record<number, any>, {
    get(target, p, receiver) {
      // 当 add[1] 时，p 为 1，当 add + 4 时，需要取对象原始值，p 为 Symbol.toPrimitive
      if (p === Symbol.toPrimitive) {
        return () => value;
      }
      return createProxy(value + Number(p));
    },
  });
}
