import { effect } from '../2.activeEffect';
import ref from '../3.ref';

// 简单类型的包裹
export default function computed(getter: AnyFn) {
  // 通过闭包，代理了raw这个入参（局部参数）
  const result = ref(undefined);
  // 副作用，getter中的响应式数据又更新的话，eff会再次执行并更新result.value
  const eff = () => {
    result.value = getter();
  };
  effect(eff);
  return result;
}
