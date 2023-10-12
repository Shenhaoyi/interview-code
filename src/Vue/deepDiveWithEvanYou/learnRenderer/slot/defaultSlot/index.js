const { createApp, h } = Vue;

const Stack = {
  props: ['size'], // props必须定义才能拿到
  render() {
    const defaultSlots = this.$slots.default ? this.$slots.default() : []; // 保证是个数组
    return h(
      'div',
      { class: 'stack' },
      defaultSlots.map((child) => {
        return h(
          'div',
          {
            style: {
              paddingLeft: `${this.$props.size}px`,
            },
          },
          child,
        );
      }),
    );
  },
};
createApp({
  components: {
    Stack, // 组件局部注册
  },
  // 模板
  template: `
    <Stack :size="10">
      <div>hello</div>
      <Stack :size="20">
        <div>hello</div>
        <Stack :size="30">
          <div>hello</div>
        </Stack>
      </Stack>
    </Stack>
  `,
}).mount('#app');
