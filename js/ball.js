/**
 * Created by MengL on 16/10/11.
 */
function Ball(radius,color){
  if(radius === undefined){
    radius = 40;
  }
  if(color === undefined){
    color = "#ff0"
  }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = color;
  this.lineWidth = 1
  this.vx = 0;
  this.vy = 0;
}

Ball.prototype.draw = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.rotate(this.rotation);
  cxt.scale(this.scaleX, this.scaleY);
  cxt.lineWidth = this.lineWidth;
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.arc(0,0, this.radius, 0, Math.PI*2, true);
  cxt.closePath();
  cxt.fill();
  if(this.lineWidth > 0){
    cxt.stroke()
  }
  cxt.restore();
}

Ball.prototype.getBounds = function () {
  return{
    x:this.x - this.radius,
    y:this.y - this.radius,
    width:this.radius * 2,
    height:this.radius * 2
  }
}