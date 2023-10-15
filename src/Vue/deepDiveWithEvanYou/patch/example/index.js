import { h } from '../../mount/h.js'; // 没有预处理器，不能省略.js
import { mount } from '../../mount/mount.js';
import { patch } from '../index.js';

const vDom = h('div', { class: 'red' }, [h('span', null, 'hello')]);
mount(vDom, document.getElementById('app'));

const vDom2 = h('div', { class: 'blue' }, [h('span', null, 'bye')]);
const btn = document.getElementById('btn');
btn.onclick = () => {
  patch(vDom, vDom2);
  btn.setAttribute('disabled', true);
};

const reset = document.getElementById('reset');
reset.onclick = () => {
  btn.removeAttribute('disabled');
  patch(vDom2, vDom);
};
