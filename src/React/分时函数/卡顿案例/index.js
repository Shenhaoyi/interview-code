const btn = document.getElementById('btn');
const container = document.getElementById('container');
const array = Array.from({ length: 10000 }, (_, i) => i);
btn.addEventListener('click', () => {
  array.forEach((i) => {
    const el = document.createElement('div');
    el.innerHTML = i;
    container.appendChild(el);
  });
});
