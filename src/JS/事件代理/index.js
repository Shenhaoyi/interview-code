// 事件代理封装
function on(eventType, element, selector, callback) {
  element.addEventListener(eventType, (e) => {
    let el = e.target;
    while (!el.matches(selector) && el !== element) {
      el = el.parentNode;
    }
    if (el !== null) {
      callback.call(el, e, el);
    }
  });
  return element;
}

const li = document.querySelector('ol');

on('click', li, 'li', (e, el) => {
  console.log('clicked', e, el);
});
