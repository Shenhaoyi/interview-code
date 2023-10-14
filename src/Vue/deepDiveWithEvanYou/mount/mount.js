// 挂载到真实DOM上
export function mount(VNode, container) {
  const { tag, props, children } = VNode;

  // 1、根据tag创建真实DOM
  const el = document.createElement(tag);

  // 2、设置 attribute
  if (props) {
    for (const key in props) {
      const value = props[key];
      el.setAttribute(key, value);
    }
  }

  // 3、处理 children: 只支持 string | VNode[]
  if (children) {
    // 如果是字符串，直接修改 textContent
    if (typeof children === 'string') {
      el.textContent = children;
    } else {
      // 数组里面默认都是 VNode
      children.forEach((child) => {
        mount(child, el); // 递归挂载
      });
    }
  }

  // 4、放到 container 中
  container.appendChild(el);
}
