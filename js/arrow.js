/**
 * Created by MengL on 16/10/10.
 */

//跟随鼠标转动的箭头
function Arrow(){
  this.x = 0;
  this.y = 0;
  this.color = "#ffee00";
  this.rotation = 0
}
//画一个箭头,首先要确定他的位置和旋转角度,然后绘制,并且在最后要恢复初始状态
Arrow.prototype.draw = function (cxt) {
  cxt.save();
  //移动x,y的位置
  cxt.translate(this.x, this.y);
  //rotate接受的参数是一个弧度值
  cxt.rotate(this.rotation);
  cxt.lineWidth = 2;
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.moveTo(-50,-25);
  cxt.lineTo(0,-25);
  cxt.lineTo(0,-50);
  cxt.lineTo(50,0);
  cxt.lineTo(0,50);
  cxt.lineTo(0,25);
  cxt.lineTo(-50,25);
  cxt.lineTo(-50,-25);
  cxt.closePath();
  cxt.fill();
  cxt.stroke();
  cxt.restore();

}