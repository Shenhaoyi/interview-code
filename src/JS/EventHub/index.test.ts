import EventHub from './index';

test('should trigger event listeners correctly', () => {
  const eventHub = new EventHub<string>();

  const handler = (data: string) => {
    expect(data).toBe('hello');
  };

  const handler2 = (data: number) => {
    expect(data).toBe(24);
    // 这个监听器不应该被触发
    expect.fail('Handler should not be triggered');
  };

  // 添加事件监听器
  eventHub.on('greeting', handler);
  eventHub.on('age', handler2);
  eventHub.off('age', handler2);
  // 触发事件
  eventHub.emit('greeting', 'hello');
  eventHub.emit('age', 24);
});
