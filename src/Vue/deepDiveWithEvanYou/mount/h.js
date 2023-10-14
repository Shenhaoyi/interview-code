// 简单创建 VNode
export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}
