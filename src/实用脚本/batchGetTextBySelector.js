// 获取节点的直接文本，不包含子节点
function getDirectChildText(node) {
  return Array.from(node.childNodes)
    .filter((node) => node.nodeName.includes('text'))
    .map((node) => node.nodeValue);
}

// 根据选择器批量获取所有元素的直接文本
function batchGetTextBySelector(selector) {
  const list = document.querySelectorAll(selector);
  const result = Array.from(list).map(getDirectChildText);
  return result.flat();
}

const textList = batchGetTextBySelector('div.reply_content');
