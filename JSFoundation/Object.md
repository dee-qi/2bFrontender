对象是JS的基本数据类型，可以看做属性的__无序__集合，每个属性是一个key/value对。属性名是字符串，所以还可以看做从字符串到值的映射。这种数据结构也叫散列(hash)，散列表(hash table)，字典(dictionary)，关联数组(associative array)。

JS的继承是**原型式继承(prototypal inheritance)**

JS的对象是动态的，可以新增、删除属性

JS中除了string, number, boolean, null, undefined之外都是对象

****

> 对象的属性

* 名字
* 值
* 属性特性(property attribute)
  
  * 可写(writable attribute)

    是否可以设置该属性的值

  * 可枚举(enumerable attribute)

    是否可以用for in循环返回该属性

  * 可配置(configurable attribute)
    
    是否可以删除或者修改该属性

ES5之前，所有通过代码创建的属性都是三可的。从ES5之后可以对他们进行设置。

****

> 对象的组成

* 属性
* 原型(prototype)

  指向另一个对象。对象本身的属性继承自这个对象

* 类(class)

  标识对象类型的__字符串__

* 拓展标记(extensible flag)

  (在ES5中)是否可以对对象增加新属性

****

> 三类对象和两类属性

* 内置对象
  
  由ECMAScript规范定义的内置对象，如数组、函数、日期、正则表达式

* 宿主对象

  由JS所嵌入的宿主环境所定义的。如web浏览器定义的document、window等

* 自定义对象

  用户自己搞的

* 自有属性

  直接在对象里定义的属性

* 继承属性

  在原型对象中定义的属性