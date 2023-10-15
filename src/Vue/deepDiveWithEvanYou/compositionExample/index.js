import { useFetch } from './useFetch.js';
const { createApp, ref } = Vue;

const Post = {
  props: ['id'],
  setup(props) {
    const { data, error, isPending } = useFetch(() => `https://jsonplaceholder.typicode.com/todos/${props.id}`);
    return { data, error, isPending };
  },
  template: `
    <div v-if="isPending"> loading... </div>
    <div v-else-if="error"> {{ error }} </div>
    <div v-else-if="data"> {{ data }} </div>
  `,
};

const App = {
  setup() {
    const id = ref(1);
    const plus = () => {
      id.value += 1;
    };
    return { id, plus };
  },
  components: { Post },
  template: `
    <button @click="plus">id+1</button>
    <Post :id="id"></Post>
  `,
};
createApp(App).mount('#app');
