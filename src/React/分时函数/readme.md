[参考视频](https://v.douyin.com/idxnFeAX/)
# 卡顿案例
> 浏览器遇到需要执行js的代码时，会停止渲染，等js执行完，再继续渲染。参考[chatgpt回答](https://chat.openai.com/share/0a0c566d-b1b1-41b3-8cce-c11d1ae661c1)

for 循环，在页面中进行 10000 次 dom 插入操作，会阻塞页面渲染。需要进行优化

# 时间分片
利用requestIdleCallback 实现时间分片，在浏览器空闲的时间执行任务
