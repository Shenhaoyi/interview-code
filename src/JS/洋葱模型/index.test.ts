import { TaskPro } from '.';

test('TaskPro', async () => {
  const tp = new TaskPro();
  tp.addTask(async (ctx: typeof tp.context, next: typeof tp.next) => {
    ctx.res = [1];
    await next();
    ctx.res.push(2);
  });

  tp.addTask((ctx: typeof tp.context) => {
    ctx.res.push(3);
  });

  tp.addTask((ctx: typeof tp.context) => {
    ctx.res.push(4);
  });
  await tp.run();
  await tp.run(); // 这里不运行的原因是任务列表已经清空了
  await tp.run();
  console.log(tp);
  expect(tp.context.res).toEqual([1, 3, 4, 2]);
});
