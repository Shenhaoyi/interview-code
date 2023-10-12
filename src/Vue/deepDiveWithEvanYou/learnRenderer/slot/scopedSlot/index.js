const { createApp, h, ref } = Vue;

const Test = {
  setup() {
    const test = ref('i am a scoped prop');
    return { test };
  },
  render() {
    const slot1 = this.$slots.slot1 ? this.$slots.slot1({ test: this.test }) : []; // 保证是个数组
    return h('div', slot1);
  },
};
createApp({
  components: {
    Test, // 组件局部注册
  },
  // 模板
  template: `
    <Test>
      <template #slot1="{ test }"> <p>{{ test }}</p> </template>
    </Test>
  `,
}).mount('#app');
