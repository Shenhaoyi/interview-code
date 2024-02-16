// 基于 class 的单例实现
export class SingleDog {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  static instance?: SingleDog;
  static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new SingleDog(name);
    }
    return this.instance;
  }
}
