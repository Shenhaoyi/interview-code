const btn = document.getElementById('btn');
const container = document.getElementById('container');
const array = new Array(10000).fill(undefined).map((_, i) => i);
btn.addEventListener('click', () => {
  array.forEach((i) => {
    const el = document.createElement('div');
    el.innerHTML = i;
    container.appendChild(el);
  });
});
