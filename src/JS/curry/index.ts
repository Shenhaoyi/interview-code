export function curry(fn: Function): any {
  const length = fn.length;
  return function curried(...args: any[]): any {
    if (args.length >= length) {
      return fn.apply(null, args);
    } else {
      return function (...args2: any[]): any {
        return curried(...args, ...args2);
      };
    }
  };
}
