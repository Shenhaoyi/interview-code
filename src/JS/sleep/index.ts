/* 
  说明：https://juejin.cn/post/6866053913443827719
  
  setTimeout、Promise、async/await就不用实现一遍了，太简单了

*/

function sleep(time: number) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < time) {}
}

console.log('shen log: ', { start: new Date() });
sleep(2000);
console.log('shen lend: ', { end: new Date() });
