> *

所有元素

> tag

标签选择器

> .class

类选择器

> #id

id选择器

****

> e1, e2, e3

选择e1和e2和e3

> e1 e2 后代（包含）选择器

选择e1元素内的所有e2元素 

> e1>e2 子元素选择器

选择所有父元素是e1的e2元素

> e1+e2 相邻兄弟选择器

紧接着e1之后的e2元素，且二者有相同父元素

****

# 属性选择器

> [attribute]

所有含有arrtibute属性的元素

> [attr=value]

所有有属性attr且值为value的元素，必须完全匹配

> [attr~=value]

所有有属性attr且值中含有单词value的元素

> [attr^=value]

所有有属性attr且值以value开头的元素

> [attr$=value]

所有有属性attr且值以value结尾的元素

> [attr*=value]

所有有属性attr且值包含子串value的元素

> [attr|=value]

所有有属性attr且值等于value或者以value开头的元素

****

# 伪类

> selector:pseudo-class

* :link
  
  未访问的链接

* :visited

  已访问的链接

* :hover

  鼠标移动到上面

* :active

  激活的的元素

* :focus

  拥有键盘输入焦点的元素

* :first-child

* lang()

  带有指定lang属性的元素

  eg: `q:lang(no){color: red;}`

# 伪元素

* :first-letter

  文本的第一个字母

* :first-line

  文本的第一行

* :before

  元素之前添加内容

* :after

  元素之后添加内容