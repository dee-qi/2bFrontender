JS函数

* 参数化：形参，上下文
* JS的函数是对象
* 可以嵌套定义形成闭包(closure)

# 函数的定义

```js
/*函数声明语句*/
function name(a, b, c){
    /*some thing*/
};
/*函数定义表达式*/
var name = function(a, b, c){
    /*some thing*/
}
```

通过第一种方法定义的函数，可以在js文件任何地方调用。第二种方法定义的函数只能在之后调用。（因为要把函数赋值给一个变量，而变量赋值是无法提前的）

**声明提前**：任何变量，在所在的函数体开头就已经被声明了（不赋值）

```js
var a = '123';
function f(){
    console.log(a);//a在这个函数体内其实已经被声明，覆盖了外层的a，然而还没有被赋值。
    var a = '321';
    console.log(a);
}

>undefined
>'321'
```
# 调用

### 函数调用

this在严格和非严格模式下的区别

### 方法调用

方法链：`shape.setX(1).setY(2).setR(3).fill()`

当方法不需要返回东西时，最好返回this

### 构造函数的调用

* 没有实参时允许省略括号

* 调用构造函数的上下文是新建的这个对象，可以用this来引用它

  如`new o.m()`的上下文并不是o

* 通常不用return，如果return一个对象，则这个对象就是调用构造函数的返回值就是这个对象，如果没有return或者return不是对象，则忽略return，正常返回一个对象。

### 间接调用

* call()
* apply()

# 函数的实参和形参

JS的函数调用不对传入参数做任何检查，甚至都不检查个数=_=

### 可选形参

传入的参数比形参个数少时，剩下的都会被设为undefined。所以函数应当设计的有较好的适应性

```js
function getPropertyNames(o, /*optional*/a){
    if(a === undefined) a = [];
    for(var pros in o){
        a.push(pros);
    }
    return a;
}
```
函数里的第一行代码可以用 `a = a || [];`代替

1. 无法省略第一个参数而传入第二个，可以把第一个传undefined
2. 注释里记得用/*optional\*/标记可选参数

### 可变长的实参列表：实参对象(arguments)

在函数体内，aruguments是指向实参对象的引用，实参对象是一个类数组对象。

在非严格模式下，arguments的各个元素是对应实参的别名，也就是说改了一个另一个同样也会改。

__【caller和callee】__

实参对象arguments还定义了caller和callee属性，在ES5严格模式中读写这两个属性会报错。

在非严格模式下，callee代表当前正在执行的函数，caller是非标准的，大多数浏览器令他指调用当前函数的函数。

callee可以用作在匿名函数中递归

### 对象用作实参

好处：不用记住参数的顺序了

# 作为值的函数

还可以定义函数的属性

# 作为命名空间的函数

背景：JS的变量在整个函数体内都是可见的，所以不能声明一个只在一个代码区块可见的变量(后来的let可以了)

```js
function module(){
    /***
    * 模块代码
    * 这个区域所使用变量均为局部变量
    * 而不会污染全局命名空间
    */
}

module(); //别忘了调用

/*或者采用如下方式直接调用*/
(function(){
    //sth
}());
```

# 闭包

函数的执行依赖于变量作用域，这个作用域是在函数定义时决定的，而不是执行时。函数对象的内部状态不仅包含属性还引用当前的作用域链。

```js
var a = '123';
function check(){
    var a = '321';
    return function(){return a;}
}

check()(); //结果是321
```

内部的function在定义时就已经确定了其引用的作用域链。

这样看来，闭包可以捕捉到局部变量并把它带到外部。

> 我们将作用域链描述为一个对象列表,不是绑定的栈。每次调用JavaScript函数的时候,都会为之创建一个新的对象用来保存局部变量,把这个对象添加至作用域链中。当函数返回的时候,就从作用域链中将这个绑定变量的对象删除。如果不存在嵌套的函数,也没有其他引用指向这个绑定对象,它就会被当做垃圾回收掉。如果定义了嵌套的函数,每个嵌套的函数都各自对应一个作用域链,并且这个作用域链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来,那么它们也会和所指向的变量绑定对象一样当做垃圾回收。但是如果这个函数定义了嵌套的函数,并将它作为返回值返回或者存储在某处的属性里,这时就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收,并且它所指向的变量绑定对象也不会被当做垃圾回收。——《JavaScript权威指南》

制作一个计数器：

```js
function counter(){
    var n = 0;
    return {
        count: function(){return n++};
        reset: function(){n=0;}
    }
}

var c = counter(), d = counter();
c.count();
c.count();
d.count();
c.reset();
d.reset();
```

还可以把这个闭包合并为属性存取器方法

```js
function counter(n){
    return {
        get count(){ return n++; },
        set count(m){
            if(m > n) n = m;
            else throw Error('m must be greater');
        }
    };
}
```

为对象添加私有属性

```js
function addPrivateProperty(o, name){
    var value;

    o['get' + name] = function(){ return value; };
    o['set' + name] = function(m){ value = m; };
}
```

【注意】this是js的关键字而不是变量，闭包无法访问外部函数的this，解决方法是用一个变量储存this。

另外，arguments是一个变量，但它也由类似的性质。

```js
var a = {
    f: function(a, b){
        var self = this;
        var args = arguments;
        console.log('f-this:', this); //输出的对象a
        console.log('f-arguments:', arguments); //有着1和2的arguments
        return function(c){
            console.log('inner-this:', this); //全局变量window
            console.log('inner-self:', self); //对象a
            console.log('inner-arguments:', arguments); //有着3的arguments
            console.log('inner-args:', args); //有着1和2的arguments
        }
    }
}

a.f(1,2)(3);
```

# 函数的属性、方法和构造函数

### length属性

只读属性，指形参的个数。

有时用arguments.length和arguments.callee.length比较来判断传入参数个数是否正确

### prototype

当函数用作构造函数时，新建的对象会从这个函数的prototype对象里继承属性

### call()和apply()方法

* 第一个参数：一个对象，是这个函数调用的上下文（this所指）
  
  `f.call(o);`相当于：

  ```js
  o.m = f;
  o.m();
  delete o.m;
  ```
  严格模式中，第一个参数会绝对被当做this的值，哪怕是个字符串、数字甚至null和undefined。而在非严格模式和ES3中，传入null和undefined会被全局对象代替，传入原始值会被相应包装对象代替

* call()从第二个参数开始，作为函数的实参
* apply()第二个参数是一个数组（or数组对象），数组的各个元素作为函数的实参

应用示例，记录函数的执行时间

```js
function trace(o, m){
    var original = o[m];
    o[m] = function(){
        console.log(new Date(), 'Entering...');
        var result = original.apply(this, arguments);
        console.log(new Date(), 'Existing...');
        return result;
    };
}
```

### bind()方法 ES5

把一个方法绑定到一个对象上，返回一个函数，调用这个函数时的上下文（this）即是绑定的哪个对象。

```js
function f(y){ return this.x + y; }

var k = f.bind({ x: 1 });
k(2); //3
```

还有一些其他效应：bind()方法从第二个参数开始的参数，会在实际调用这个返回的方法时，插在传入的实参前面。如：

```js
function f(y, z){return this.x + y + z};

var o = { x: 1 };

var g = f.bind(o, 2);

g(3); //6
```

* bind返回的函数，其length是绑定函数的形参个数（上例中函数f的形参个数）减去所绑定的实参的个数（bind从第二个开始的参数个数），但不得小于0

* 如果bind()返回的函数用作构造函数，将忽略传入的this(第一个参数)

* 由bind()产生的函数不含prototype属性，将这种函数用作构造函数时，对象从原函数的prototype里继承属性。

### toString()

一般函数返回源码

内置函数返回\[ native code ](代表函数体)：
```js
console.log(isNaN);
> ƒ isNaN() { [native code] }
```

### Function()构造函数

传入任意个数的形参，最后一个参数是一个字符串，代表函数体。

```js
var f = new Function('x', 'y', 'return x+y;')
```

* 允许js运行时动态创建编译函数
* 每次调用Function()都会解析函数体并创建新的函数对象，用在循环里可能会影响效率。相比之下，另外两种定义函数的方式不会每次执行时都重新编译。
* Function()创建的函数，其代码体的编译总是在顶层函数（全局作用域）执行。如下：

```js
var a = '123';

function() f(){
    var a = '321';
    return new Function('return a;');
}

f()(); //输出123
```

### 可调用对象

# 函数式编程

**暂时先不看了。**