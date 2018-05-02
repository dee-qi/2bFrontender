# float 浮动

它可以让元素脱离标准流，悬浮在标准流上，沿着容器的左边或者右边放置。最初目的是实现文字环绕图片的效果，现在广泛应用于各种神奇的布局。

## 基本用法

```css
selector {
    float: left; /*left | right | none | inherit*/
}
```

## 浮动的定位

> “A floated box is shifted to the left or right until its outer edge touches the containing block edge or the outer edge of another float. If there is a line box, the outer top of the floated box is aligned with the top of the current line box.”

当一个元素浮动之后，它会被移出正常的文档流，然后向左或向右平移，一直碰到所处的容器块的边缘，或者碰到另外一个浮动的元素。如果有个行盒，则对齐于行盒的顶部。

![position](img/float/position.png)

demo中看出，如果上一个兄弟元素是块级元素，浮动元素会在新的一行浮动，如果上一个兄弟元素是行内元素，浮动元素会在当前行盒内浮动，且顶部对齐。

最后，如果浮动元素较多，会一个接一个填满行盒的一行，然后自动换行。这点和行内盒很像，还有人称浮动元素就是特殊的```display: inline-block```

## 清除浮动

浮动是具有破坏性的：

* 其后面元素的布局会受到影响
* 父元素的高度会坍塌

解决这两个问题的方案称为**清除浮动**。主要思路有两个：

* 清除前面兄弟的浮动
* 利用父元素闭合子元素的浮动

### 1.清除前面兄弟的浮动

这个思路很简单，只要在不想被浮动元素影响的兄弟元素上添加属性```clear: both```就可以了。

原理：在CSS2之前，clear为元素自动增加上外边距，使之落在浮动元素下面。但是在CSS2.1中，引入了**清除区域(clearance)**，在元素上外边距之上额外增加间距，使之落在浮动元素下方。所以设置clear元素的margin-top是无效的，要想两者间有间距，需要设置浮动元素的margin-bottom。

### 2.利用父元素闭合子元素的浮动

在页面排版时，若没有设置父元素的高度，其高度是由子元素撑开的。若子元素设置了浮动，父元素计算高度时就会忽略该元素，甚至说如果所有子元素都是浮动的，父元素的高度就是0。这就是**父元素高度塌陷**的问题。

有两种方案可以闭合子元素浮动（使父元素计算高度时算上浮动子元素）：

* 给最后一个元素设置```clear:both```

  * 最后加一个空标签，设置其```clear:both```
    
    不优雅，增加无用标签，不利于维护。

  * clearfix方法

    思路：通过父元素的伪元素```::after```来实现
    ```css
    .clearfix::after {
    content:"";
    display:table;
    clear: both;
    }
    ```

    这样一来，只需要给父元素增加类名clearfix就可以闭合子元素的浮动了。

    至于为什么要```display:table```，参见[clearfix进化史](http://web.jobbole.com/85965/)

* 给父元素新建一个BFC

  原理：BFC计算高度时包含浮动子元素

  实现原理参见[normal-flow](normal-flow.md)的BFC触发方式，最常用的是```overflow: hidden```

## 负margin布局

利用浮动和margin实现多栏布局，比较典型的是三栏布局，具体实现放时参照[笔记：CSS实现双飞翼和圣杯布局](双飞翼和圣杯.md)

