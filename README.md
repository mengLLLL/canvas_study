---
title: canvas笔记
date: 2016-10-08 10:30:26
categories:
- canvas
- html5
tags:
- canvas
---
* 最基本的使用
  - 创建一个画布
    1. 所有的操作都在画布的context上面
    2. canvas是基于状态而不是基于对象的，比如说颜色都是赋值给context，并不是一条线
  - canvas 标签
  ```
  <canvas id="myCanvas" height="200" width="100"></canvas>
  ```
<!--more-->
* 使用javascript来绘制图像
  - 基本步骤：
  ```
  var c = document.getElementById("myCanvas");//前提是有这个canvas元素
  var ctx = c.getContext("2d")//创建getContext("2d")对象
  //下面就可以绘图了。在ctx对象上
  ```
  - `getContext()`,获得渲染上下文和他的绘画功能，只有一个参数－上下文的格式
  - 绘制矩形
  ```
  fillRect(x,y,width,height)//绘制一个填充的矩形
  strokeRect(x,y,width,height)//绘制一个矩形的边框(也就是一个带边框的矩形啦)
  clearRect(w,y,width,height)//清除指定矩形区域，让清楚部分完全透明
  ```
  - 绘制路径
  ```
  ctx.beginPath()//必须要先新建一条路径,如果没有beginPath()那么，会从延续之前的路径，所谓的延续表现出来就是“连着”－－－从上次结束的地方开始，如果要想独立画，那最好的习惯就是每次开始前begin，结束后close
  closePath()//闭合路径之后图形绘制命令又重新指向到上下文中,在绘制封闭多边形的时候，建议成对使用
  stroke()//通过线条来绘制图形轮廓
  fill()//通过填充路径的内容区域生成实心的图形
  ```
  - 移动笔触
  ```
  moveTo(x,y)//相当于从哪里开始画图的意思
  ```
  - 线
  ```
  lineTo(x,y)//绘制一条从当前位置到指定x，y的直线（这里的x,y是终点）,指定线段的终点
  ```
  - 曲线
    - `quadraticCurveTo(cpx,cpy,x,y)`,二次贝赛尔曲线路径的方法，接受两个点为参数，第一个点是控制点，第二个是终点，起点在就是当前moveTo的点，这样可以画一个基于起点到终点，受控于控制点的一个曲线，通俗一点的理解就是控制点就像一只手把一条线拽起来一样，注意，并不是把一条直线拽起来，如果是拽直线，那就成折线了，而不是曲线。并且曲线永远不会触碰到控制点，而会在中途偏离控制点。
    - `bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)`
    - `arcTo(cp1x,cp1y,cp2x,cp2y,radius)`
  - 圆弧
  ```
  arc(x,y,radius,startAngle,endAngle,anticlockwise)//画一个以(x,y)为圆心，radius为半径，从startAngle开始到endAngle结束，按照anticlockwise给定的方向(默认为顺时针)来生成，需要注意的是startAngle和endAngle的单位是弧度，不是度数，角度与弧度的js表达式：radians=(Math.PI/180)*degress.
  ```
  - 色彩
  `fillStyle = color`设置图形的填充颜色，`strokeStyle = color`设置线条的颜色
  
  - 透明度 `globalAlpha = transparencyValue`,取值范围0-1
  ```
  ctx.globalAlpha = 0.2
  ```  
  
  
  
  - line Styles
  ```
  lineWidth //设置线条宽度，默认为1.0
  lineCap   //设置线条末端样式？什么鬼，其实就是线条的帽子，值有butt/round/square,默认值为butt
  lineJoin  //设置线条与线条之间相交处的样式，值有round/bevel/miter,默认是miter
  miterLimit//当lineJoin属性设置为miter的时候，该属性可用于控制两条相交线外侧交点与内侧交点的距离，必须是一个大于零的有限的数字，默认值为10.
  getLineDash()//返回一个包含当前虚线样式，长度为非负偶数的数组
  setLineDash()//设置当前虚线样式
  lineDashOffset//设置虚线样式的起始偏移量
  ```
  
 lineCap三个属性见下图 
  ![linecap](https://developer.mozilla.org/@api/deki/files/88/=Canvas_linecap.png)
   lineJoin三个属性见下图
  ![lineJoin](https://developer.mozilla.org/@api/deki/files/89/=Canvas_linejoin.png)
  
  - 使用虚线
  ```
  ctx.setLineDash([4,2])//接受一个数组作为参数，来指定线段与间隙的交替
  ctx.lineDashOffset = 0//设置起始偏移量
  ```
  
  - 渐变
  ```
  createLinearGradient(x1,y1,x2,y2)//指定渐变的起点和终点
  createRadialGradient(x1,y1,r1,x2,y2,r2)//确定两个圆
  gradient.addColorStop(offset,color)//上色,offset取值范围是0-1，表示渐变中开始用于结束之间的位置，color就是在offset位置显示的颜色值
  用法举例 
  var lineargradient = ctx.createLinearGradient(0,0,150,150);
  lineargradient.addColorStop(0,'black')；//定义渐变的颜色
  ctx.fillStyle = lineargadient;//把渐变颜色给fillstyle或者strokestyle都行
  ctx.fillRect(0,0,200,200)//这样就创建出一个渐变的矩形
  ```

  
  - 图案样式
  ```
  createPattern(image,type)//image可以是一个image对象的引用或者另外一个canvas对象，type必须是repeat/repeat-x/repeat-y/no-repeat之一
  举例：
  var img = new Image()//第一次见
  img.src = 'someImage.png';
  img.onloda = function(){
   var ptn = ctx.createPattern(img,'repeat');
   ctx.fillStyle = ptn;
   ctx.fillRect(0,0,150,150)
  }
  ```
  
  - 阴影
  ```
  shadowOffsetX //设定阴影在x轴上延伸距离，默认为0
  shadowBlur //设定阴影的模糊程度，默认为0
  shadowColor //设定阴影的颜色，默认是全透明的黑色
  ```
  
  - 绘制文本
  ```
  fillText(text,x,y [,maxWidth])//在指定的位置填充指定文本，最大宽度可选
  strokeText(text,x,y [,maxWidth])//在指定的位置绘制文本边框(也就是空心的文字啦)，最大宽度可选
  举例：
  ctx.font = "48px serif";
  ctx.fillText('Hello world',10,50)
  ```
  
  - 文本的样式
  ```
  font //设置字体大小和字体名称
  textAlign //文本对齐选项，值start/end/left/right/center，默认start
  textBaseline //基线对齐选项。值top/hanging/middle/alphabetic,ideographic,bottom,默认alphabetic
  direction //文本方向，值ltr/rtl/inherit,默认inherit
  ```
  
  - 测量文本
  `measureText()`返回一个textMetrics对象的宽度，所在像素，体现文本特性的属性
  ```
  var text = ctx.measureText('foo');
  text.width;//就可以输出宽度了
  ```
  
* 应用图像
  > canvas图像操作能力很强大
  
  - 引入图像
  ```
  1，获得一个指向HTMLImageElement的对象或则另一个canvas的引用作为源，也可以通过提供一个url的 让是来使用图片
  2，使用drawImage()函数将图片绘制到画布上
  ```
  
  - 获得需要绘制的图片
  ```
  HTMLImageElement //由Image()构造出来，或者任何的<img>元素
  HTMLVideoElement//可以用一个html的<video>元素作为图片远，抓取某一帧作为一个图像
  HTMLCanvasElement//使用一个<canvas>元素作为图片源
  ImageBitmap//高性能的位图，可以从上述的所有源一集其它几种源中生成
  ```
  
  - 绘制图片
  >所谓绘制图片就是在图片上画的意思
  
  ```
  drawImage(image,x,y)//image是image或者canvas对象，x，y是在其目标canvas里的起始目标
  ```
  
  - 缩放图片
  ```
  drawImage(image,x,y,width,height)//参数比上面多了两个，控制当canvas画入的时候应该缩放的大小
  ```
  
  - 切片
  
  > 也就是裁剪图片,有点意思
  
  ```
  drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight)//参数见下图，前5个和上面的一样
  ```
  
  ![slicing](https://developer.mozilla.org/@api/deki/files/79/=Canvas_drawimage.jpg)
  - 控制图像的缩放行为
  `cx.mozImageSmoothingEnabled = false //火狐`
* 变形

> 变形操作都是在对一个图像设置好属性之后、绘制之前用的

  - 状态的保存和恢复
  `save()`, 用来保存canvas状态，canvas状态保存在一个栈中，保存一次，当前的状态就入栈，返回上一步的操作，就是`restore()`，恢复状态
  - 移动（translating）
  ```
  translate(offsetx,offsety)//offsetx是左右偏移量，offsety是上下偏移量，变形前保存状态是个很好的习惯
  ```
  
  - 旋转（rotating）
  ```
  rotate(angle)//angle是以顺时针为方向、以弧度为单位的值
  ```
  
  - 缩放（scaling）
  ```
  scale(x,y)//x，y是横轴和纵轴的缩放因子，必须为正值，比1小是缩小，比1大是放大，默认情况下，canvas 的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。
  ```
  
  - 变形（transforms）
  ```
  transform(m11,m12,m21,m22,dx,dy)//目前没懂
  ```
  
> 移动、旋转、缩放，是叠加的，比如之前已经translate(100,100),左右上下偏移一百，此时位置为a点，如果后面没有移回来，又用了translat(200,200),那么是在a的基础上继续偏移，所以这个时候restore 的作用就来了，恢复状态，恢复在save时候的状态
  
* 动画

> 所谓动画，就是不停的重绘，达到一种动的视觉效果

  - 基本步骤
  	1. 清空canvas
  	2. 保存canvas状态
  	3. 绘制动画图形
  	4. 恢复canvas状态，然后重绘下一帧
  - `window.requestAnimationFrame(callback)`
    > 用来在页面重绘之前，通知浏览器调用一个指定的函数，如果想要得到连贯的逐帧动画，函数中必须要重新调用,用法：
    ```
    function callback(){
    	window.requestAnimationFrame(callback);// 放在第一行
    	//函数体
    } 
    ```
  - 动画中的公式
    - 三角学基础函数
      1. sine of angle = opposite/hypotenuse
      2. cosine of angle = adjacent/hypotenuse
      3. tangent of angle = opposite/adjacent
    - 角度与弧度互转
      1. radians = degrees * Math.PI / 180
      2. degrees = radians * 180 / Math.PI
    -  创建波
    ```
    (function drawFrame(){
      	window.requestAnimationFrame(drawFrame);
      	angle += speed;
      }())
    ```
    
    - 创建圆形
    ```
    (function drawFrame(){
    	window.requestAnimationFrame(drawFrame);
    	xposition = centerX + Math.cos(angle)*radius;
    	yposition = centerY + Math.sin(angle)*radius;
    	angle += speed;
    }())
    ```
    
    - 创建椭圆形
    ```
    (function drawFrame(){
    	window.requestAnimationFrame(drawFrame);
    	xposition = centerX + Math.cos(angle)*xradius;
    	yposition = centerY + Math.sin(angle)*yradius;
    	angle += speed;
    }())
    ```
    
    - 获取两点间的距离
    ```
    dx = x2 - x1;
    dy = y2 - y1;
    distance = Math.sqrt(dx*dx + dy*dy)
    ```
* 保存文件
  - `canvas.toDataURL(type,encoderOptions)`,type是图片格式(可选)，默认image/png,encoderOptions是图片质量(可选)，默认范围为0-1，默认值0.92
* 小结
  - canvas画布常用接口
    1. canvas.width
    2. canvas.height
    3. canvas.getContext('2d')
  - 所谓状态，就是颜色、边框、线条宽度等等这些具体的属性
  - 矩形的绘制
    1. rect(x, y, width, height),绘制一个矩形，仅仅是路径，没有任何状态（也就是没有颜色没有边框）
    2. fillRect(x, y, width, height)，绘制一个有填充色的矩形
    3. strokeRect(x, y, width, height)，绘制一个有边框的矩形
* TIPS
  - 一个有填充色并且描边的图像，应该先填充后描边（先fill后stroke），如果反过来的话，边的一半会被填充色覆盖掉
  - 所谓速度、加速度的问题：
  
  > 物理上v = at，x=v*t; 在canvas上没有时间的概念，因为是逐帧渲染的，可以想象成一帧就是1s，但是时间有递加的概念，而帧并没有，所以对应过来如果想要取得有“加速度的效果”，那么x += a,也就是叠加一个加速度的值，这样就像有了加速度一样；如果对应过来想要取得有“速度”的效果，那么就是x += v,也就是位置叠加一个速度,这样就像有了速度一样
  
  