/**
 * Created by MengL on 16/10/10.
 */
var untils = {};
//捕捉鼠标位置

//一失手成千古恨,工具应该是utils,拼写错了,但是很多文件都用到了,就不改了
untils.captureMouse = function(element){
  var mouse = {
    x:0,
    y:0
  }
  element.addEventListener('mousemove', function (event) {
    var x,y;
    if(event.pageX || event.pageY){
      x = event.pageX;
      y = event.pageY;
    }else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= element.offsetLeft;
    y -= element.offsetTop;
    mouse.x = x;
    mouse.y = y;
  },false);
  return mouse;
}
/**
 *
 * @param rect 一个对象,比如ball的getBounds方法返回值
 * @param x
 * @param y
 * @returns {boolean} (x,y)这个点是否位于矩形的边界内
 */
untils.containsPoint = function (rect, x, y) {
  return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height)
}
/**
 *
 * @param rectA
 * @param rectB
 * @returns {boolean} 两个矩形相交返回true
 */
untils.intersectx = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
            rectB.x + rectB.width < rectA.x ||
            rectA.y + rectA.height < rectB.y ||
            rectB.y + rectB.height < rectA.y)
}