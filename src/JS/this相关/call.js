/*
  实现思路：将函数挂在目标对象上执行，执行完卸载
 */
Function.prototype.myCall = function (target, ...args) {
  const _this = this; // x.mycall, 所以this就是x，即要绑定到target上的函数
  const name = _this.name; // 可以拿到函数的名字
  Reflect.set(target, name, _this); // 等价于 target[name] = _this;
  const result = target[name](...args); // 记得要将结果过返回！！
  Reflect.deleteProperty(target, name);
  return result;
};

// 测试
function saySomething(message) {
  console.log(`${message}, I'm ${this.name}.`);
}

const person = { name: 'Bob' };

saySomething.myCall(person, 'Good morning');
