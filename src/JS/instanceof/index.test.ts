import { instanceOf } from './index';
test('instanceOf', () => {
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  const personInstance = new Person('shen');
  expect(instanceOf(personInstance, Person)).toEqual(true);
  expect(instanceOf(personInstance, Object)).toEqual(true);
  expect(instanceOf(personInstance, Array)).toEqual(false);
});
