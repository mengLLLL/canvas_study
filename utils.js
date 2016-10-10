/**
 * Created by MengL on 16/10/10.
 */
var untils = {};
//捕捉鼠标位置
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