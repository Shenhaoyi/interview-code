import { h } from '../h.js'; // 没有预处理器，不能省略.js
import { mount } from '../mount.js';

const vDom = h(
  'div',
  {
    class: 'red',
    onClick: () => {
      console.log('on click');
    },
  },
  [h('span', null, 'hello')],
);

mount(vDom, document.getElementById('app'));
