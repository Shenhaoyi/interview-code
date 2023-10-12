const { createApp, h, ref } = Vue;

createApp({
  setup() {
    const id = ref(0);
    const getItem = () => {
      id.value++;
      return {
        id: id.value,
        text: `my ${id.value}`,
      };
    };
    const list = ref([getItem()]);
    const addItem = () => {
      list.value.push(getItem());
    };
    return { list, addItem };
  },
  render() {
    return h('div', { class: 'v-for' }, [
      h(
        'button',
        {
          onClick: this.addItem,
        },
        'add item',
      ),
      this.list.map(({ text, id }) => {
        return h(
          'div',
          {
            key: id,
            class: 'item',
          },
          text,
        );
      }),
    ]);
  },
}).mount('#app');
