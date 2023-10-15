const { createApp, h } = Vue;

const MouseComponent = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageX;
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  unMounted() {
    window.removeEventListener('mousemove', this.update);
  },
  // template: '<slot x="x" :y="y"></slot>', 下面的render相当于
  render() {
    return (
      this.$slots.default &&
      this.$slots.default({
        x: this.x,
        y: this.y,
      })
    );
  },
};

const TestComponent = {
  data() {
    return {
      x: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.x++;
    }, 200);
  },
  render() {
    return this.$slots.default && this.$slots.default({ x: this.x });
  },
};

const App = {
  components: { MouseComponent, TestComponent },
  template: `
  <MouseComponent v-slot="{ x, y }">
    <TestComponent v-slot="{ x: z }">  <!-- 可以清楚地知道变量来自哪里，有冲突的时候也很方便修改名称 -->
      {{ x }} {{ y }} {{ z }}
    </TestComponent>
  </MouseComponent>`,
};

createApp(App).mount('#app');
