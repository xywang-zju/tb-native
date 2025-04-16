// renderer.js

// 日志输出到控制台
console.log('这是来自外部renderer.js文件的JavaScript代码。');

// 简单的交互功能
document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('.external-style');
  h1.addEventListener('click', () => {
    alert('你点击了标题！');
  });
});