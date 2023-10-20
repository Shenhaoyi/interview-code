const btn = document.getElementById('btn');
const container = document.getElementById('container');
const array = Array.from({ length: 10000 }, (_, i) => i);
btn.addEventListener('click', () => {
  performChunk(array);
});

function performChunk(dataList) {
  if (dataList.length === 0) return;
  let i = 0;
  const { length } = dataList;
  // 在空闲时间执行剩余任务
  function _run() {
    if (i >= length) return;
    requestIdleCallback((IdleDeadline) => {
      while (IdleDeadline.timeRemaining() > 0) {
        const el = document.createElement('div');
        el.innerHTML = dataList[i];
        i++;
        container.appendChild(el);
      }
      _run(); // 下一次有空闲时间的时候继续执行
    });
  }
  _run();
}
