let prevHash = '';
const app = document.querySelector('#app');
const length = 3;
// 路由表
const initRoutes = () => {
  const result = {};
  const doms = Array.from({ length }, (ele, index) => {
    const div = document.createElement('div');
    const route = `router-${index}`;
    div.id = route;
    div.textContent = String(index);
    return div;
  });
  doms.forEach((div) => {
    result[div.id] = div;
  });
  result.defaultHash = doms[0].id; // 默认路由
  return result;
};
const routes = initRoutes();
const cannotFound = (() => {
  const div = document.createElement('div');
  div.textContent = '404';
  return div;
})();

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

// hash 为空时，设置默认路由
const handleDefaultRoute = () => {
  if (window.location.hash === '') window.location.hash = routes.defaultHash;
};

const handleHashChange = () => {
  if (window.location.hash === '') {
    handleDefaultRoute();
    return;
  }
  const hash = window.location.hash.substring(1);
  if (prevHash) {
    /* 移除旧的 */
    const prevDiv = routes[prevHash];
    if (prevDiv) {
      app.removeChild(prevDiv);
    } else {
      // 说明上一个路由没匹配上
      app.removeChild(cannotFound);
    }
  }
  const div = routes[hash];
  if (div) {
    app.appendChild(div);
  } else {
    app.appendChild(cannotFound);
  }
  prevHash = hash;
};
handleHashChange();
window.addEventListener('hashchange', handleHashChange);
