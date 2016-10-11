/**
 * Created by MengL on 16/10/11.
 */
function Ship(){
  this.x = 0;
  this.y = 0;
  this.width = 25;
  this.height = 20;
  this.rotation = 0;
  this.showFlame = false;
}

Ship.prototype.draw = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.rotate(this.rotation);
  cxt.lineWidth = 1;
  cxt.strokeStyle = "#f00";
  cxt.beginPath();
  cxt.moveTo(10,0);
  cxt.lineTo(-10,10);
  cxt.lineTo(-5,0);
  cxt.lineTo(-10,-10);
  cxt.lineTo(10,0);
  cxt.stroke();
  if(this.showFlame){
    cxt.beginPath();
    cxt.moveTo(-7.5,-5);
    cxt.lineTo(-15,0);
    cxt.lineTo(-7.5,0);
    cxt.stroke();
  }
  cxt.restore();
}