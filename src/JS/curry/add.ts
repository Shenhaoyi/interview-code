export function add(...args: number[]) {
  const list = [...args];
  const help = function (...args2: number[]) {
    list.push(...args2);
    return help;
  };
  help.toString = function () {
    return list.reduce((pre, cur) => pre + cur, 0);
  };
  return help;
}
