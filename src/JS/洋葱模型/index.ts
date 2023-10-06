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
    if (this.currentIndex < this.taskList.length) {
      await this.runOneTask();
    } else {
      // 重置
      this.taskList = [];
      this.isRunning = false;
      this.currentIndex = 0;
    }
  }
  private async runOneTask() {
    const cb = this.taskList[this.currentIndex];
    const startIndex = this.currentIndex;
    await cb(this.context, this.next.bind(this));
    if (startIndex === this.currentIndex) {
      this.next();
    }
  }
  async run() {
    if (this.isRunning || this.taskList.length === 0) return;
    this.isRunning = true;
    await this.runOneTask();
  }
}
