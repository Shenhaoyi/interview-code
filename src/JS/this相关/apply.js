/*
  实现思路：与 call 只有函数的参数传递方式不同
 */
Function.prototype.myApply = function (target, args) {
  const _this = this; // x.mycall, 所以this就是x，即要绑定到target上的函数
  const name = _this.name; // 可以拿到函数的名字
  Reflect.set(target, name, _this); // 等价于 target[name] = _this;
  const result = target[name](...args);
  Reflect.deleteProperty(target, name);
  return result;
};

// 测试
function saySomething(message) {
  console.log(`${message}, I'm ${this.name}.`);
}

const person = { name: 'Bob' };

saySomething.myApply(person, ['Good morning']);
