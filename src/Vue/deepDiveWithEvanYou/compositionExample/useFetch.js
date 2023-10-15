const { ref, watchEffect } = Vue;

// url会变化，以副作用的形式传入，使用watchEffect进行依赖追踪
export function useFetch(getUrl) {
  // 这些参数在外面用的时候如果是分开使用的话，使用reactive包在一起还需要toRefs来包一下，不如直接一开始就用ref
  const isPending = ref(true);
  const error = ref(null);
  const data = ref(null);
  const reset = () => {
    isPending.value = true;
    error.value = null;
    data.value = null;
  };

  // getUrl中有响应式数据，变更就重新请求
  watchEffect(() => {
    reset();
    fetch(getUrl())
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        isPending.value = false;
      });
  });

  return {
    data,
    error,
    isPending,
  };
}
