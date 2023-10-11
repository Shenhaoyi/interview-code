/* 
  WeakMap<
    对象，
    Map<
      对象属性，
      Set<依赖该属性的副作用>
    >
  >
*/
const targetMap = new WeakMap<Object, Map<string, Set<AnyFn>>>();

// 对副作用进行依赖追踪
export function track(target: Object, key: string, effect: AnyFn) {
  let depMap = targetMap.get(target);
  if (!depMap) {
    depMap = new Map<string, Set<AnyFn>>();
    targetMap.set(target, depMap);
  }
  let deps = depMap.get(key);
  if (!deps) {
    deps = new Set<AnyFn>();
    depMap.set(key, deps);
  }
  deps.add(effect);
}

// 依赖变更时调用，用来触发副作用
export function trigger(target: Object, key: string) {
  const depMap = targetMap.get(target);
  if (!depMap) return;
  const deps = depMap.get(key);
  if (!deps) return;
  deps.forEach((effect) => effect());
}
