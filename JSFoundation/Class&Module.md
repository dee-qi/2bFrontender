JS类的实现是基于其原型继承机制的。

# 类和原型

类的所有实例对象都从同一个原型对象上继承属性。因此原型对象是类的核心。

# 类和构造函数

```js
function Range(from, to){
    this.from = from;
    this.to = to;
}

Range.prototype = {
    includes: function(x){
        return this.from <= x && this.to >= x;
    },
    foreach: function(f){
        for(var x = Math.ceil(this.from); x <= this.to; x++){
            f(x);
        }
    },
    toString: function(){
        return 'from: ' + this.from + ', to: ' + this.to;
    }
}
```

### 构造函数和类的标识

原型对象是类的唯一标识，构造函数不能作为类的标识。两个不同的构造函数可能由同样的peototype，此时他们创造出来的示例属于同一个类。

但构造函数通常是类的“外在表现”。构造函数的名称通常用作类名。更根本地讲，用instanceof来检测对象属于某个类时要用到构造函数：

```js
r instanceof Range; //true
```

只要r继承自Range.prototype，就返回true，而不一定要求r是由构造函数Range()创建的。

# constructor属性

除了bind()返回的函数，所有函数都有prototype属性，其指向一个对象，这个对象有constructor属性，指向这个函数。

```js
var F = function(){};
F.prototype.constructor === F; //true
```

这意味着，对象通常继承的constructor都指他们的构造函数。

需要注意的是，最上面Range那个例子，直接给构造函数的prototype绑定了一个新对象，这个对象不含有constructor属性，因此其创建的对象也不会有这个属性。为了进行补救，【1】可以给它加上`constructor: Range,`，或者采用如下写法（【2】在自带的prototype对象上增加自己需要继承的属性）：

```js
function Range(from, to){
    this.from = from;
    this.to = to;
}

Range.prototype.includes = function(){/*...*/};
Range.prototype.foreach = function(){/*...*/};
Range.prototype.toString = function(){/*...*/};
```

# JS中的JAVA式类继承

* 实例方法
* 实例字段
* 类方法
* 类字段

JS的实现方法：

1. 定义一个构造函数，设置初始化新对象的实例字段
2. 给构造函数的prototype对象定义实例方法
3. 给构造函数定义类字段和类方法

# 类的扩充

给原型对象添加新方法来动态扩充JS类

# 类和类型

检测对象类的三种技术

* instanceof 和 isPrototypeOf()

  若o继承自c.prototype，则`o instaceof c`返回true。

  如果不想用构造函数作为中介，可以用isPrototypeOf()

  缺点：在客户端JS中多窗口和多框架子页面兼容性不佳，每个页面都有单独的执行上下文，每个上下文都有单独的一组全局变量和构造函数，其中一个页面的数组对象不是另一个页面Array的示例，instanceof 返回false

* constructor

  检测对象的constructor属性。

  缺点同上，而且并非所有对象都有constructor属性，比如前文直接把一个不含constructor的对象赋值给了构造函数的prototype

* 构造函数的名称

  一些JS的实现为函数提供了name属性。没有提供的可以把函数转为字符串然后提取名称。

  克服了第一个缺点，但是仍然有的缺点是，并不是所有构造函数都有名称，如下：

  ```js
  var Range = function(){}; //这个函数没有名称
  var Range = function Range(){}; //这个有名称
  ```

### 鸭式辩型

上文的检测方式多少都有问题，解决办法是规避这些问题，不要关注“对象的类是什么”，而关注“对象能做什么”

> 像鸭子一样走路、游泳并且嘎嘎叫的就是鸭子

