/*
  节流：从第一次触发之后一段时间不再触发，也就是delay时间内只能执行一次
*/
export function throttle(fn: Function, delay: number) {
  let timeoutID: ReturnType<typeof setTimeout> | undefined;
  // 这个返回的函数被绑定出去，xxx.yy调用的时候能拿到this
  return function (...args: unknown[]) {
    if (!timeoutID) {
      timeoutID = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args); // 这里用箭头函数，直接写this也可以
        timeoutID = undefined;
      }, delay);
    }
  };
}

const fn = function (num: number) {
  // @ts-ignore
  console.log(new Date(), this, num);
};

// 绑定
const ob = {
  fn: throttle(fn, 1000),
};

// 触发
ob.fn(1);
ob.fn(2); // 2 3 4 不会执行
ob.fn(3);
setTimeout(() => {
  ob.fn(4);
}, 500);
setTimeout(() => {
  ob.fn(5);
}, 1000);

// expect: 1 5
