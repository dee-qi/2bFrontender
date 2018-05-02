# CSS3 Transition

> 属性： transition

css3过渡是把元素从一种样式转化为另一种样式，其过程是渐变的。

必须规定两点：

* 希望把渐变效果作用在哪个（哪些）属性上
* 渐变效果的时长

For 个 example:
```css
div {
    transition: width 2s;
    /*等价于
    transition-property: width;
    transition-duration: 2s;
    */
}
```

下面是transition所有属性的示例：
```css
div {
    transition-property: width;
    transition-duration: 2s;
    /*渐变效果的时间方程*/
    transition-timing-function: ease;
    transition-delay: 1s;
    /*可以直接简写为
    transition: width 2s ease 1s;
    */
}
```
## transition-timing-function详解

规定过渡效果的速度曲线，默认值为```ease```

语法：
```
transition-timing-function: linear|ease|ease-in|ease-out|cubic-bezier(n,n,n,n);
```

|Value|Description|
|-|-:|
|linear|完全相同的速度|
|ease|慢开始，逐渐变快，慢速结束|
|ease-in|慢速开始|
|ease-out|慢速结束|
|ease-in-out|慢速开始和结束|
|cubic-bezier(n,n,n,n)|自定义cubic-bezier函数，n为0和1之间的数值|

## cubic-bezier函数

Link:

* [cubic-bezier演示网站](http://cubic-bezier.com/#.17,.67,.83,.67)

* [一篇不错的CSDN讲解](https://blog.csdn.net/zhaozjc112/article/details/52909172)

这是个Progression-Time曲线，即纵轴代表的是过程完成度，横轴代表时间。曲线斜率就代表着速度。

