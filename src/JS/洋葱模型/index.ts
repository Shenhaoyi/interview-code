/*
  任务执行的洋葱模型：调用next可以先去执行下一个任务，如果没有调用，则自动在当前任务结束后调用
  参考：https://v.douyin.com/idFNQws5/
*/

export class TaskPro {
  taskList: AnyFn[] = []; // 任务队列
  isRunning = false; // 是否在执行任务
  currentIndex = 0; // 当前执行的任务下标
  context: Record<string, any> = {};
  addTask(cb: AnyFn) {
    this.taskList.push(cb);
  }
  async next() {
    this.currentIndex++;
    await this.innerRun();
  }
  reset() {
    this.taskList = [];
    this.isRunning = false;
    this.currentIndex = 0;
  }
  // 内部调用，执行一个任务
  private async innerRun() {
    if (this.currentIndex > this.taskList.length - 1) return; // 边界条件
    const task = this.taskList[this.currentIndex];
    const tempIndex = this.currentIndex;
    await task(this.context, this.next.bind(this)); // this指向问题！！
    if (this.currentIndex === tempIndex) {
      // 如果 task 内部没有调用 next，则需要在这里调用
      await this.next();
    }
  }
  // 外部调用，开始执行任务
  async run() {
    if (this.isRunning || this.taskList.length === 0) return; // 在run或者无task可run
    this.isRunning = true; //
    this.context = {}; // context 在这里重置
    await this.innerRun();
    this.reset();
  }
}
