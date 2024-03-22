export default class EventHub<T = string, Fn extends Function = Function> {
  /**
   *  Map<订阅名称, 回调队列>
   */
  map = new Map<T, Fn[]>(); //
  on(name: T, fn: Fn) {
    const list = this.map.get(name) || [];
    list.push(fn);
    if (!this.map.has(name)) this.map.set(name, list);
  }
  emit(name: T, data: unknown) {
    const list = this.map.get(name) || [];
    list.forEach((fn) => {
      fn(data);
    });
  }
  off(name: T, fn: Fn) {
    const list = this.map.get(name) || [];
    const index = list.indexOf(fn);
    if (index !== -1) {
      list.splice(index, 1);
      if (list.length === 0) {
        this.map.delete(name);
      }
    }
  }
}
