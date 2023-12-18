/*
  实现思路：使用闭包，调用时将 target 和函数绑定
*/
Function.prototype.myBind = function (target, ...args1) {
  const _this = this; // 被绑定到对象上的函数
  return function (...args2) {
    return _this.call(target, ...args1, ...args2); // 注意拼接两部分接收的参数
  };
};

// 测试
function saySomething(message1, message2) {
  console.log(`${message1}, I'm ${this.name}. ${message2}.`);
}

const person = { name: 'Bob' };

const newSaySomething = saySomething.myBind(person, 'Good morning');
newSaySomething('la la la');
