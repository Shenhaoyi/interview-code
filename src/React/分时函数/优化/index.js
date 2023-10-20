const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const container = document.getElementById('container');
  const handler = (item, index) => {
    const el = document.createElement('div');
    el.innerHTML = item;
    container.appendChild(el);
  };
  const array = Array.from({ length: 10000 }, (_, i) => i);
  // 通过计时器进行调度：1000秒之后执行，执行500毫秒
  // const scheduler = (task) => {
  //   const start = new Date();
  //   setTimeout(() => {
  //     task(() => new Date() - start > 500);
  //   }, 1000);
  // };
  // performChunk(handler, array, scheduler);
  browserPerformChunk(handler, array);
});

function performChunk(
  handler, // 任务单元执行
  dataList,
  scheduler, // 何时开启下一块的执行，每块执行多少，由scheduler进行调度
) {
  if (dataList.length === 0) return;
  let i = 0;
  const { length } = dataList;
  // 在空闲时间执行剩余任务
  function _run() {
    if (i >= length) return;
    scheduler((idGoOn) => {
      while (idGoOn() && i < length) {
        handler(dataList[i], i);
        i++;
      }
      _run(); // 下一次有空闲时间的时候继续执行
    });
  }
  _run();
}

function browserPerformChunk(handler, dataList) {
  const scheduler = (task) => {
    // 空闲时间执行
    // 运行多少取决于空闲时间有多少
    requestIdleCallback((IdleDeadline) => {
      task(() => IdleDeadline.timeRemaining() > 0);
    });
  };
  performChunk(handler, dataList, scheduler);
}
