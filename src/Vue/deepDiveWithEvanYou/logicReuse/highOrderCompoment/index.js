const { createApp, h } = Vue;

const MouseMixin = {
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
};

// 高阶组件
function withMouse(inner) {
  return {
    ...MouseMixin,
    render() {
      return h(inner, { x: this.x, y: this.y });
    },
  };
}

const App = withMouse({
  props: ['x', 'y'],
  template: '{{ x }} {{ y }}',
});

createApp(App).mount('#app');
