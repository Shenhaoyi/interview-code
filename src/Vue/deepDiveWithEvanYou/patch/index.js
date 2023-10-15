/**
 * @description: 对比新旧VNode更新页面
 * @param {*} n1 old VNode
 * @param {*} n2 new VNode
 * @return {*}
 */
export function patch(n1, n2) {
  // 如果两个 node 是相同类型的
  if (n1.tag === n2.tag) {
    // 拿到旧的节点的 DOM
    const el = n1.$el;
    n2.$el = el; // 把真实DOM挂到n2上

    // 1、props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    // 修改/新增的props
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        el.setAttribute(key, newValue);
      }
    }
    // 删除的props
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // 2、children
    const oldChildren = n1.children;
    const newChildren = n2.children;
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        // 都是文本类型
        if (newChildren !== oldChildren) {
          // 直接替换 textContent
          el.textContent = newChildren;
        }
      } else {
        // 新的是文本节点，直接设置 textContent 把 el 中的内容覆盖掉
        el.textContent = newChildren;
      }
    } else {
      // 新的是数组，旧的是文本
      if (typeof oldChildren === 'string') {
        el.innerText = '';
        // 遍历数组，将子 vNode 挂载到 el 上
        newChildren.forEach((child) => {
          mount(child, el);
        });
      } else {
        // 新旧均为数组
        // 这里简单实现一下，没有用到key之类的，低效版本
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        // 前commonLength个VNode处理
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // 多/少的节点处理
        if (newChildren.length > oldChildren.length) {
          // 多出来的挂到el上
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el);
          });
        } else if (newChildren.length < oldChildren.length) {
          // 少出来的从el上remove
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child.el);
          });
        }
      }
    }
  } else {
    // 元素类型已更换，直接replace，代码省略
  }
}
