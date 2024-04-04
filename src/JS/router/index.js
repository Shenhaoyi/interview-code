let prevHash = '';
const length = 3;
// dom 列表
const routes = Array.from({ length }, (ele, index) => {
  const div = document.createElement('div');
  const route = `router-${index}`;
  div.id = route;
  div.textContent = String(index);
  return div;
});

// 生成 hash 链接
const mountRouterLinks = () => {
  const links = Array.from({ length }, (ele, index) => {
    const a = document.createElement('a');
    a.href = `#router-${index}`;
    a.style.marginRight = '20px';
    a.textContent = `go to ${index}`;
    return a;
  });
  const routerLinks = document.querySelector('#router-links');
  links.forEach((link) => routerLinks.appendChild(link));
};
mountRouterLinks();
const app = document.querySelector('#app');
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (prevHash) {
    /* 移除旧的 */
    const prevDiv = routes.find((route) => route.id === prevHash);
    prevDiv && app.removeChild(prevDiv);
  }
  const div = routes.find((route) => route.id === hash);
  console.log(div);
  div && app.appendChild(div);
  prevHash = hash;
});
