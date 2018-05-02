# CSS3 Transform 2D

## tansform属性

用于改变元素的位置、形状和尺寸。可以用2D或者3D变换

> 2d转换方法有：
> * translate() 位置变换
> * rotate() 旋转变换
> * scale() 缩放
> * skew() 斜切
> * matrix() 矩阵变换
>
> 以上方法除matrix()外，都可以加个X或者Y表示在X轴和Y轴进行相应变换。不加的话，接收两个参数，分别表示X和Y轴的变化。

用法示例：

```css
/*每个转换方法下面给出的是矩阵变换的写法*/
#box1{
    transform: skew(30deg, 0deg);
    /* transform: matrix(1,0,0.5,1,0,0) */
}
#box2{
    transform: scale(0.5, 1);
    /*transform: matrix(0.5,0,0,1,0,0)*/
}
#box3{
    transform: rotate(45deg);
    /* transform: matrix(0.71,0.71,-0.71,0.71,0,0) */
}
#box4{
    transform: translate(10px, 20px);
    /* transform: matrix(1,0,0,1,10,20); */
}
#box5{
    /*多个变换同时使用，用空格隔开*/
    transform: skew(30deg, 0) scale(0.5, 1) rotate(45deg) translate(10px, 20px);
}
```

matrix用法详解：[张鑫旭-理解CSS3 transform中的matrix](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)

**一定让学弟学妹们好好学线代QAQ**

## transform-origin属性

用于改变x轴和y轴的位置。3d变换时还能改变z轴。

*该属性必须与```transform```属性一起使用*

语法：
```
transform-origin: x-axis y-axis z-axis;
```
x-axis的取值为:

* left
* center
* right
* length(长度值，如10px)
* %

y-axis的取值为：

* top
* center
* bottom
* length
* %

z-axis的取值为：

* length

用法示例：我想让这个div绕着左下角旋转50 degree！
```css
div{
    transform: rotate(50deg);
    transform-origin: left bottom;
}