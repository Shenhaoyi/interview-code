let activeEffect: null | AnyFn = null;

// 触发依赖收集，在这里执行的时候activeEffect才不为null
export function effect(eff: AnyFn) {
  activeEffect = eff;
  eff(); // 执行以进行依赖收集，
  activeEffect = null;
}

/* 
  WeakMap<
    对象，
    Map<
      对象属性，
      Set<依赖该属性的副作用>
    >
  >
*/
const targetMap = new WeakMap<Object, Map<string | Symbol, Set<AnyFn>>>();

// 对副作用进行依赖追踪
export function track(target: Object, key: string | Symbol) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map<string | Symbol, Set<AnyFn>>();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set<AnyFn>();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

// 依赖变更时调用，用来触发副作用
export function trigger(target: Object, key: string | Symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;
  deps.forEach((effect) => effect());
}

// 使用Proxy进行代理，自动进行依赖追踪和变更通知
export default function reactive<T extends Object>(target: T) {
  const handler: ProxyHandler<Object> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldVal = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (oldVal !== value) {
        trigger(target, key);
      }
      return result;
    },
  };
  return new Proxy<T>(target, handler);
}
