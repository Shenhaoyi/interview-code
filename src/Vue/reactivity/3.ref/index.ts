import { track, trigger } from '../2.activeEffect';

// 简单类型的包裹
export default function ref(raw: any) {
  // 通过闭包，代理了raw这个入参（局部参数）
  const r = {
    get value() {
      track(r, 'value');
      return raw;
    },
    set value(val: any) {
      const oldVal = raw;
      raw = val;
      if (oldVal !== raw) {
        trigger(r, 'value');
      }
    },
  };
  return r;
}
