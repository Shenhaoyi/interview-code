let prevPath = '';
const app = document.querySelector('#app');
const length = 3;
// 路由表
const initRoutes = () => {
  const result = {};
  const routeList = Array.from({ length }, (ele, index) => {
    const route = {};
    const div = document.createElement('div');
    const path = `router-${index}`;
    div.id = path;
    div.textContent = String(index);
    route.dom = div;
    route.path = path;
    return route;
  });
  routeList.forEach((route) => {
    result[route.path] = route;
  });
  result.defaultPath = routeList[0].path; // 默认路由
  return result;
};
const routes = initRoutes();
const cannotFound = (() => {
  const div = document.createElement('div');
  div.textContent = '404';
  return div;
})();
// 生成 path 链接
const mountRouterLinks = () => {
  const handleClick = (path) => {
    return (e) => {
      e.preventDefault();
      window.history.pushState({}, '', path);
      handlePathChange(path); // 手动触发
    };
  };
  const links = Array.from({ length }, (ele, index) => {
    const a = document.createElement('a');
    a.href = `./router-${index}`;
    a.style.marginRight = '20px';
    a.textContent = `go to ${index}`;
    a.onclick = handleClick(`router-${index}`);
    return a;
  });
  const routerLinks = document.querySelector('#router-links');
  links.forEach((link) => routerLinks.appendChild(link));
};
mountRouterLinks();

const handlePathChange = (path) => {
  if (path === '') {
    // 默认路由
    path = routes.defaultPath;
    window.history.pushState({}, '', path);
  }
  if (prevPath) {
    /* 移除旧的 */
    const prevRoute = routes[prevPath];
    if (prevRoute) {
      app.removeChild(prevRoute.dom);
    } else {
      // 说明上一个路由没匹配上
      app.removeChild(cannotFound);
    }
  }
  const route = routes[path];
  if (route) {
    app.appendChild(route.dom);
  } else {
    app.appendChild(cannotFound);
  }
  prevPath = path;
};

const getPathName = () => {
  return window.location.pathname.substring(1);
};
handlePathChange(getPathName());

// 这个事件不触发啊
window.addEventListener('popstate', () => {
  console.log('popstate');
});
