/**
 * 实现newFn
 * 原理：调用obj构造函数，原型链指向对象构造函数原型
 **/
function newFn() {
  // 创建一个新对象
  const obj = new Object();
  // 去除第一个参数，并移除arguments第一个参数供后续使用
  const Constructor = [].shift.call(arguments);
  // 让这个obj继承一下Constructor原型链上的东西
  obj.__proto__ = Constructor.prototype;
  // 借用Constructor方法，将参数赋值, 如果有返回值将其赋值给result
  const result = Constructor.call(obj, ...arguments);
  // 如果result是返回的对象，则返回result，否则返回新生成的对象
  return typeof result === 'object' ? result : obj;
}