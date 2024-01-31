export function isAsyncFunction(fn: AnyFn): boolean {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}
