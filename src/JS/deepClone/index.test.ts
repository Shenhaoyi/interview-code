import { deepClone } from './index';
test('deepClone', () => {
  class Person {
    age: number;
    name: string;
    constructor() {
      this.age = 18;
      this.name = 'shen';
    }
    sayHi() {
      console.log(`Hi, I'm ${this.name}`);
    }
    getName() {
      return this.name;
    }
  }
  // @ts-ignore
  Person.prototype.tag = 'person';
  class Student extends Person {
    grade: string;
    _this: Record<string, any>;
    base: Person;
    constructor() {
      super();
      this.grade = '高三';
      this._this = this; // 循环引用
      this.base = new Person(); // 深度对象
    }
  }
  const student = new Student();
  const copyStudent = deepClone(student);
  expect(copyStudent).toEqual(student);
  // 测试继承属性和方法
  expect(copyStudent.hasOwnProperty('sayHi')).toBe(false);
  expect(copyStudent.hasOwnProperty('tag')).toBe(false);
  expect(copyStudent['tag']).toBe('person');
});
