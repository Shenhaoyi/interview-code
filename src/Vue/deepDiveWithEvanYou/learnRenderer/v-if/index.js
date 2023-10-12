const { createApp, h, ref } = Vue;

createApp({
  setup() {
    const isOk = ref(false);
    return { isOk };
  },
  render() {
    return h('div', { class: 'v-if' }, [
      h(
        'button',
        {
          // 如果使用function会有this指向问题，用箭头函数的话this取决于外层上下文也就是render函数中的this，所以最终指向组件实例
          onClick: () => {
            console.log('this :>> ', this);
            this.isOk = !this.isOk; // isOk挂在组件实例上的，不用.value了
          },
        },
        'trigger isOk',
      ),
      this.isOk ? h('div', { class: 'is-ok' }, 'is ok') : h('div', { class: 'not-ok' }, 'not ok'),
    ]);
  },
}).mount('#app');
