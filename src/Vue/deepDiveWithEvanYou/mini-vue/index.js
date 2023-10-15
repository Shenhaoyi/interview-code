import reactive, { effect } from '/dist/Vue/reactivity/2.activeEffect/index.js';
import { h } from '../mount/h.js';
import { mount } from '../mount/mount.js';
import { patch } from '../patch/index.js';

const App = {
  data: reactive({
    count: 0,
  }),
  render() {
    return h('div', null, [
      h('div', { class: 'test' }, String(this.data.count)), // 简单实现的mount里面不支持number
      h(
        'button',
        {
          class: 'test',
          onClick: () => {
            this.data.count++;
          },
        },
        '+1',
      ),
    ]);
  },
};

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

mountApp(App, document.getElementById('app'));
