const { createApp } = Vue;

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
createApp({
  mixins: [MouseMixin],
  template: '{{ x }} {{ y }}',
}).mount('#app');
