// 小球元素
const ball = document.querySelector('#ball');
const lastPosition = [0, 0]; // 记录上一次鼠标的位置

// 鼠标移动事件处理函数
function moveBall(event) {
  // 计算小球新的位置
  const moveX = event.pageX - lastPosition[0]; // 与上一次鼠标位置的偏移量，即小球应该移动的距离
  const moveY = event.pageY - lastPosition[1];
  lastPosition[0] = event.pageX;
  lastPosition[1] = event.pageY;
  // 设置小球的新位置
  const oldLeft = parseInt(ball.style.left || '0');
  const oldTop = parseInt(ball.style.top || '0');
  ball.style.left = moveX + oldLeft + 'px'; // 用绝对定位来进行偏移
  ball.style.top = moveY + oldTop + 'px';
}

function handleMouseDown(event) {
  // 计算鼠标按下位置相对于小球的偏移量
  lastPosition[0] = event.pageX;
  lastPosition[1] = event.pageY;

  document.addEventListener('mousemove', moveBall);

  document.addEventListener('mouseup', handleMouseUp);
}

// 结束时，释放监听的事件
function handleMouseUp() {
  document.removeEventListener('mousemove', moveBall);
  document.removeEventListener('mouseup', handleMouseUp);
}

ball.addEventListener('mousedown', handleMouseDown);
