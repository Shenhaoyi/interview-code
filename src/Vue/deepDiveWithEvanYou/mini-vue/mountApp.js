import { effect } from '/dist/Vue/reactivity/2.activeEffect/index.js';
import { mount } from '../mount/mount.js';
import { patch } from '../patch/index.js';

// 挂载根组件
export function mountApp(component, container) {
  let isMounted = false;
  let preVDom = null;
  // 将整颗虚拟DOM树的render作为effect
  effect(() => {
    if (!isMounted) {
      const vDom = component.render();
      mount(vDom, container);
      isMounted = true;
      preVDom = vDom;
    } else {
      const newVDom = component.render();
      patch(preVDom, newVDom);
    }
  });
}
