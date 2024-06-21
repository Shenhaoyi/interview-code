/**
 * @description: 并发请求（Promise.allSettled的基础上，加上数量限制）
 * @param {AnyFn} requests 待发起的请求
 * @param {object} options 最大并发数
 * @return {*}
 */
export default async function concurrentRequest(requests: AnyFn[], options: { concurrentMax: number }) {
  const { concurrentMax } = options;
  const { length } = requests;
  const results: Promise<any>[] = [];
  if (!length) return Promise.resolve([]);
  // 一开始，发起前 Math.min(length, concurrentMax) 个请求
  const concurrentCount = Math.min(length, concurrentMax);
  let index = 0; // 请求的下标
  let finishCount = 0; // 已完成请求数
  let _resolve: (value: unknown) => void;
  async function sendRequest() {
    if (index >= length) return;
    // 缓存当前请求的下标
    const currentIndex = index++;
    const currentRequest = requests[currentIndex];
    try {
      const response = await currentRequest();
      results[currentIndex] = response;
    } catch (error: any) {
      results[currentIndex] = error;
    } finally {
      finishCount++;
      console.log(`第${currentIndex}个请求完成，当前已完成${finishCount}个请求`);
      if (finishCount === length) {
        _resolve(results);
      } else {
        sendRequest();
      }
    }
  }

  /*
    因为并发，所以请求之间没有等待关系，没法通过 await 来依次等待，只能通过请求完成数量来判断是否已全部完成
    所以返回一个 Promise，在请求全部完成时进行resolve
  */
  return new Promise((resolve) => {
    _resolve = resolve;
    for (let i = 0; i < concurrentCount; i++) {
      sendRequest();
    }
  });
}

function sleep(time: number) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < time) {}
}

async function mockRequest() {
  const requests = [];
  for (let i = 0; i < 50; i++) {
    requests.push(() => {
      sleep(Math.random() * 1000); // 随机等待 0-1 秒
      return fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
    });
  }
  const result = await concurrentRequest(requests, { concurrentMax: 5 });
  console.log({ result });
}

document.getElementById('btn1')?.addEventListener('click', mockRequest);
