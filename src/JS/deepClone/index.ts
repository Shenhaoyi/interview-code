const cache = new WeakMap();

/* 
  深拷贝，实现要点
  1、非对象类型直接返回（函数也是）
  2、对象类型判断，按类型进行处理（其他类型可以再拓展，这里只判断Array）
  3、处理循环引用-缓存
  4、把原型也继承下来
  5、递归处理属性
  参考：https://v.douyin.com/iR9sjYYv/
*/
export function deepClone(value: any) {
  if (typeof value !== 'object' || value === null) {
    /* 
      1. typeof 函数 = "function"，会走到这里，函数不用特殊处理，直接返回就行
      2. null 特例，需要判断一下
    */
    return value;
  }
  // 有缓存，从缓存中获取
  if (cache.has(value)) return cache.get(value);
  /* 
    这里只考虑数组和一把对象的情况。如果要处理 Set 等其他类，可以把 new get set 等进行抽象
  */
  const result: Record<string, any> = Array.isArray(value)
    ? [] // 数组直接创建就行
    : Object.create(Object.getPrototypeOf(value)); // 继承对象的原型上的属性和方法
  /* 
    循环引用处理：先缓存，再递归，递归过程中遇到同一个对象直接返回缓存结果就行。
  */
  cache.set(value, result);
  // 依次 copy 对象属性
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}
