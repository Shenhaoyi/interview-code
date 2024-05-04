// 代理 class，使得 new 的时候返回同一个实例
export function singleton(className: { new (...args: any[]): object }) {
  let instance: null | object = null;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });
  /*
    将原型上的构造函数也变成代理
  */
  className.prototype.constructor = proxy;
  return proxy;
}
