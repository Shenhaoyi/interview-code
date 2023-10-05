/*
  说明：https://juejin.cn/post/6865704100353277965
  code: 
    new LazyMan('Tony').eat('lunch').eat('dinner').sleep(10).sleepFirst(5).eat('junk food');
  expact:
    Hi, I am Tony
    等待了5秒...
    I am eating lunch
    I am eating dinner
    等待了10秒...
    I am eating junk food
*/

class LazyMan {
  stack: (() => Promise<void> | void)[] = [];
  name: string = '';
  timer: NodeJS.Timeout | null = null;
  constructor(name: string) {
    this.name = name;
    this.sayHi();
  }
  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  }
  next() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    // 链式调用的代码都是同步的，会在链式调用完成后再执行
    this.timer = setTimeout(async () => {
      for (let i = 0; i < this.stack.length; i++) {
        const callback = this.stack[i];
        await callback();
      }
    }, 0);
    return this;
  }
  eat(food: string) {
    this.stack.push(() => {
      console.log(`I am eating ${food}`);
    });
    return this.next();
  }
  sleep(time: number) {
    this.stack.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time * 1000);
      });
    });
    return this.next();
  }
  sleepFirst(time: number) {
    this.stack.unshift(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time * 1000);
      });
    });
    return this.next();
  }
}

new LazyMan('Tony').eat('lunch').eat('dinner').sleep(10).sleepFirst(5).eat('junk food');
