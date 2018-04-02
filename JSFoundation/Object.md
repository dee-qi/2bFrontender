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

****

# 一、创建对象

1. 对象直接量
       
       var empty = {};
       var point = {x:1, y:1};
       var book = {
         "main title": "JavaScript",
         'sub-title': "the difinitive guide",
         "for": "all guidence",
         author: {
           firstname: "david",
           lastname: "flanagan"
         }
       };

   ES5及以后保留字可以用作不带引号的属性名。3里保留字必须用引号括起来。

2. new一个

   new __constructor();__

   *__【JS实现继承的方法1】__*通过new创建的对象的原型是构造函数的prototype的值

       /*创建一个继承自obj的对象*/
       var f = function(){};
       f.prototype = obj;
       var fobj = new f();

3. *__【JS实现继承的方法2】__*Object.create() 【ES5】

   先提一句原型：每个对象(null和Object.prototype除外)都有个与之关联的对象，称之为原型。每个对象都从原型继承属性。

   链接的原型对象称之为原型链(prototype chain)

   如Date => Date.prototype => Object.prototype

   Object.create()提供两个参数，第一个是对象原型，第二个是对象的属性的描述

# 二、属性的查询和设置

### 查询

* 点

* 方括号

  方括号里面的东西必须是字符串

```js
var author = book.author;
var title = book['sub-title'];
```

小技巧：获取对象的addr1, addr2, addr3属性

```js
for(var i=1; i<4; i++){
  addr += customer['addr' + i];
}
```

避免属性访问出错的一种方法
```js
var length = book && book.subtitle && book.subtitle.length;
```

__只有查询时才会用到原型链，如果是设置属性，只会报错、在原始对象上修改已有属性、创建新属性，不会修改原型链__

# 删除 delete

# 检测

* in //继承和自有的都可以
* hasOwnProperty() //继承的属性检测不到
* propertyIsEnumerable() //自有属性且可枚举

# 枚举

* for in
* Object.keys() => 返回一个数组，对象中所有可枚举自有属性的名称
* Object.getOwnPropertyNames() =>所有自有属性的名称，不管能不能枚举

# 属性getter和setter

在ES5中，属性值可以用一个或者两个方法代替，就是getter和setter。由它们定义的属性叫做“存取器属性”(accessor property)，它不同于数据属性(data property)，它只有一个简单的名字

查询存取器属性的值调用其getter方法，方法返回值即是查询的值；设置值时调用setter方法，把等号右边的值作为参数传入，忽略返回值。

存取器属性不具有可写性。

```js
var o = {
  data_prop: value,

  get accessor_prop(){/*sth*/},
  set accessor_prop(value){/*sth*/}
};
```

```js
var serialnum = {
  $n: 0, //私有变量

  get next(){
    return this.$n++;
  },

  set next(n){
    if(n > this.$n) this.$n = n;
    else throw "n must be greater"
  }
}
```
# 属性的特性

数据属性的特性:

* 值 value
* 可写性 writable
* 可枚举性 enumerable
* 可配置性 configurable

存取器属性的特性：

* get
* set
* 可枚举性 enumerable
* 可配置性 configurable

ES5中定义了属性描述符(property descriptor)对象代表属性的四个特性。

获取方法： `Object.getOwnPropertyDescriptor(obj, attrName);`

只能得到自有属性，如果要获取继承属性，需要遍历原型链。`Object.getPrototypeOf()`

```js
Object.getOwnPropertyDescriptor({x:1}, 'x');
> {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
}

/*如果是存取器属性*/
> {
  set: /*func*/,
  get: undefinde,
  enumerable: true,
  configurable: true,
}
```

设置方法： `Object.defineProperty(obj, attrName, descriptor)`

可以修改和新建属性。descriptor不必包含所有特性，对于新建的属性默认值为undefined或者false，原有的特性不变。只能修改已有属性或者新建自有属性，不能操作继承属性。

```js
Object.defineProperty(o, 'x', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
})
```
同时设置多个属性：`Object.defineProperties(obj, set)`

```js
var p = Object.defineProperties({}, {
  a: {value: 1, writable: true, enumerable: false, configurable: true},
  b: {
    get: function(){return 1},
    enumerable: false,
    configurable: false
  }
});
```

**以上两个方法均返回修改后的对象，修改是在原对象上修改的，并不是拷贝一份再修改**

配置规则：

* 对象不可拓展，则不能增加属性，只能修改已有属性
* 不可配置属性不能修改可配置性和可枚举性，不能在存取器属性和数据属性之间转换
   
  * 对于数据属性，只能将可写性由true转为false，不能反向转换
  * 对于存取器属性，不能修改getter和setter方法

* 数据属性不可配置且不可写则不能修改它的值，然而可配置不可写是可以修改值的。（先把他writable转为true然后改value，再把writable改回false）

**getter和setter的老式API**

在ES5之前，除了IE外的大部分JS实现已经支持在对象直接量中用get和set的写法，并提供以下四个API（非标准），每个对象都有这四个方法

* \_\_lookupGetter\_\_() //返回一个属性的getter方法
* \_\_lookupSetter\_\_()
* \_\_defineGetter\_\_() //定义getter
* \_\_defineSetter\_\_()

# 对象的三个属性

## 原型属性

获取方法：

* ES5 `Object.getPrototypeOf()`

* ES3 `obj.constructor.prototype`

  这种检测方法并不可靠。因为通过对象直接量和Object.create()创建的对象包含一个constructor属性，其指向Object()构造方法

检测是否在原型链中：

    a.isPrototypeOf(b); //检测a是不是b的原型

Mozilla实现的JS对外暴露了一个命名为__proto__的属性，用于直接查询和设置对象的原型。__不推荐使用__

## 类属性

ES3和ES5都没提供设置这个属性的方法，并且只有一种方法可以间接查询这个属性，即对象的toString()方法（前提是没有被重写），返回如下：

    [object class]
  
因此，想要获得对象的类，应采取如下写法：

```js
Object.prototype.toString.call(o).slice(8, -1);
```

自定义的构造函数创建的对象、对象直接量、Object.create()创建的对象的类都是"Object"。下面是其他的一些常见类
```js
null => "Null"
1 => "Number"
"" => "String"
false => "Boolean"
[] => "Array"
/./ => "Regexp"
new Date() => "Date"
window => "Window"
```
## 可拓展性

ES5中所有内置对象和自定义对象都是可拓展的，除非转换为不可拓展的。宿主对象的可拓展性由实现ECMAScript的JS引擎定义。

查询可拓展性：

```js
Object.isExtensible(obj);
```

转为不可拓展：

```js
Object.preventExtensions(obj);
Object.seal(obj);
Object.freeze(obj);
```

转为不可拓展是**不可逆**的。

【给不可拓展对象添加属性的方法】转为不可拓展只影响对象本身，如果给它的原型添加属性，这个不可拓展对象同样会继承这个属性。

【对象封闭】`Object.seal()`把对象转为不可拓展，而且所有属性设为不可配置的。同样不可逆。检测用`Object.isSealed()`

【对象冻结】`Object.freeze()`把对象封闭的同时，把所有属性设置为只读（不影响由setter方法的存取器属性）。检测用`Object.isFrozen()`

【调用嵌套】上述三个方法都返回处理后的对象，所以可以像下面这样调用

```js
var o = Object.seal(Object.create(Object.freeze({x:1}), {
  y: {value: 2, writable: true}
}));
```

# 序列化对象

对象序列化(serialization)是指把对象转化为字符串，也可将字符串还原为对象。

ES5提供了`JSON.stringfy()`和`JSON.parse()`来序列化和还原对象。

JSON is short for "JavaScript Object Notation"

JSON的语法是JS对象语法的子集。其：

* 会将Infinity和NaN转化为null
* Date对象转化为ISO格式的日期字符串（参照Date.toJSON())
* 函数、Regexp、Error、null对象无法转换
* 不能序列化的属性会被直接省略
* 只能序列化可枚举的自有属性

```js
var a = {
  num: 1,
  infi: Infinity, //null
  bool: true,
  "null": null,
  st: "string",
  array:[],
  nan: NaN, //null
  und: undefined, //忽略
  fn: function(){}, //忽略
  date: new Date(), //ISO格式字符串
  reg: /./, //空对象{}
  err: new Error() //空对象{}
}

>"{"num":1,"infi":null,"bool":true,"null":null,"st":"string","array":[],"nan":null,"date":"2018-04-02T13:35:15.673Z","reg":{},"err":{}}"
```

两个函数都可以接收第二个参数决定序列化的属性

```js
JSON.parse(s, reviver); //river是对每个属性名称/值的对都调用一次的函数
JSON.parse(s);
JSON.stringfy(o);
JSON.stringfy(o, filter); //filter是指定解析属性的数组，或者在字符串化前对值做一些处理
JSON.stringfy(o, filter, intent); //intent是锁紧的空格数，不带这个参数无空格，很难看
```

# 对象方法

### toString()

Date、函数、数组等重写了toString()

### toLocaleString()

返回一个表示这个对象的本地化字符串。默认直接调用toString()。

Date和Number对这个方法进行了定制。

数组调用这个方法会对每个元素调用这个方法。

### toJSON()

Object.prototype中没有定义这个方法，但是JSON.stringfy()会调用这个方法，如果存在就使用它的返回值作为序列化结果。

### valueOf()

