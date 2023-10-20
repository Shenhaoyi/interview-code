const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const container = document.getElementById('container');
  const handler = (item, index) => {
    const el = document.createElement('div');
    el.innerHTML = item;
    container.appendChild(el);
  };
  const array = Array.from({ length: 10000 }, (_, i) => i);
  performChunk(handler, array);
});

function performChunk(
  handler, // 任务单元执行
  dataList,
) {
  if (dataList.length === 0) return;
  let i = 0;
  const { length } = dataList;
  // 在空闲时间执行剩余任务
  function _run() {
    if (i >= length) return;
    requestIdleCallback((IdleDeadline) => {
      while (IdleDeadline.timeRemaining() > 0 && i < length) {
        handler(dataList[i], i);
        i++;
      }
      _run(); // 下一次有空闲时间的时候继续执行
    });
  }
  _run();
}
