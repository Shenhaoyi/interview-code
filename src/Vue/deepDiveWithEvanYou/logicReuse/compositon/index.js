const { createApp, ref, onMounted, onUnmounted } = Vue;

function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const update = (e) => {
    x.value = e.pageX;
    y.value = e.pageX;
  };
  onMounted(() => {
    window.addEventListener('mousemove', update);
  });
  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });
  return {
    x,
    y,
  };
}

function useTest() {
  const x = ref(0);
  onMounted(() => {
    setInterval(() => {
      x.value++;
    }, 200);
  });
  return { x };
}

const App = {
  setup() {
    const { x, y } = useMouse();
    const { x: z } = useTest();
    return {
      x,
      y,
      z,
    };
  },
  template: '{{ x }} {{ y }} {{ z }}',
};
createApp(App).mount('#app');
