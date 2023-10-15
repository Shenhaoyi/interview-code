import reactive from '/dist/Vue/reactivity/2.activeEffect/index.js';
import { h } from '../mount/h.js';
import { mountApp } from './mountApp.js';

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

mountApp(App, document.getElementById('app'));
