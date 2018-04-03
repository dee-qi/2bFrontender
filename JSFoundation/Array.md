JS的数组

* 无类型
* 动态的，创建时无需声明固定大小，数组大小变化时无需重新分配空间。
* 可稀疏

JS数组的索引是基于0的32位数值。第一个索引是0，最后一个是(2^32-2)，共能容纳(2^32-1)个元素 

# 创建

```js
var a1 = [1, '2', true, {}]; //数组直接量
var a2 = new Array(); //构造方法创建空数组
var a3 = new Array(10); //有10个元素的数组
/*注意，这种方法定义的数组长度为10(a3.length=10)，但是是空的，甚至连数组的索引都还未定义*/
var a4 = new Array(5, 4, 3, 'testing, testing', {}); //显式指明数组的元素
```

# 元素读写

数组是对象的特殊形式，访问数组的索引实际上相当于访问对象的某个以数字命名的属性。

数组的特别之处在于，当使用0~2^32-2之间的数字作为索引的时候，会自动维护其length属性。

所有的索引都是属性名，但是只有在0~2^32-2之间的整数属性名才是索引。

JS数组不存在“越界”这一说。

```js
a[-1.23] = 1; //创建一个名为"-1.23"的属性
a['1000'] = 3; //数组的第1001个元素
a['1.000'] = 2; //同a[1]
```

**如果一个数组继承了元素，或者定义了getter和setter方法，那么它访问元素的时间会与常规查找对象属性的时间相近。**

# 稀疏数组

包含从0开始的不连续索引的数组。（length值大于数组元素个数）

创建稀疏数组：

```js
var a1 = new Array(5);

var a2 = [];
a2[1000] = 1;

var a3 = [1,2,3,5];
delete a3[1];
```

元素不存在和元素存在但值为undefinde是不一样的。

```js
var a1 = [, , ,];
var a2 = new Array(3);
var a3 = [undefined, undefined, undefined];

0 in a1; //false
0 in a2; //false
0 in a3; //true
```

# 数组长度

* 元素数量变化时， length变化
* length设置小于当前length的非负整数值，超过length的部分会被从数组中删除；设置大于当前length的值，会从数组后面增加一个空的区域
* 可以用`Object.defineProperty()`把length设置为不可配置的。
* 若数组元素不可配置，则他们不能被删除，从而不能把length设置为小于不可配置元素的索引值+1

# 元素添加和删除

```js
a.push(ele);
a.pop();
a.shift();
a.unshift(ele);
a.slice();
a.splice();
delete
```

# 数组遍历

* for循环
  
  优化：在嵌套循环或者其他性能要求较高的上下文中，数组长度应该只查询一次而非每次循环都要查询

* for in
  
  这个方法不会获取到不存在的元素，但是会获取到数组的其他属性，如果使用这种方法应该对其他属性进行处理
  
  ES规范允许for in循环以不同的顺序遍历对象属性。特别的，如果数组同时拥有元素和属性，返回的属性名很可能是按照创建的先后顺序排序而非数值大小。

* ES5 定义了forEach()
  
  传入一个函数，对数组的每个元素都按索引顺序调用一遍

# 多维数组

# 数组方法

* `join()`

* `reverse()`

* `sort()`

  可以传入一个比较函数自定义比较方式。比较函数接收两个参数，若要前面的参数排在前面，应该返回一个小于0的值。

  undefined排在末尾。

* `contact()`

  返回一个新数组

* `slice(0,3)`

  参数可以是负数，表示倒数第几个元素。

* `splice(a, b, c, d, e ...)`

  从索引a开始删除b个元素，并把c、d、e...元素从索引a处开始插入，方法直接在原数组上操作，返回被删掉的部分数组

* `push()和pop()`

* `unshift和shift()`

* `toString()和toLocaleString()`

# ES5中定义的数组方法

大多数ES5数组方法第一个参数为一个函数，第二个参数（可选）是第一个函数的this的值（即调用第一个函数的对象）

* `forEach(f)`

  从头到尾遍历数组，为每个元素调用函数f。为f传入三个参数：数组元素、元素索引和数组本身（后两个可忽略）

  想要终止必须把forEach放在一个try块里，在需要终止的地方通过函数f抛出异常

  ```js
  function foreach(a, f, t){
      try { a.forEach(f, t);}
      catch(e){
          if(e === foreach.break) return;
          else throw e;
      }
  }

  foreach.break = new Error("StopIteration");
  ```
  
* `map(f)`

  将数组的每个元素传给函数f，并把f的每个返回值组成一个新数组作为map()的返回值

* `filter(f)`

  返回一个由f决定的数组，该数组是原数组的子集。对于某个元素，将它作为参数传给f，若返回true或者能转化为true的值，则它在这个子集中。

* `every(f) 和 some(f)`

  相当于数学上的全称量词和存在量词。

  every(f)对于数组里每个元素调用f，都返回true，它才返回true。惰性的，只要找到一个false....

  some(f)只要有一个是true就返回true。惰性的，只要找到了一个true就不再对后面的进行判断了，直接返回结果

  根据数学定义，空数组every()为true，some()为false

* `reduce(f) 和 reduceRight(f)`

  reduce接收两个参数，第一个是函数f，第二个（可选）是初始值。不指定初始值将使用数组第一个元素和第二个元素作为第一次传入f的参数。

  f接收两个参数。首先对0和1元素调用f，返回值再和2调用f......一直处理完最后一个

  ```js
  var a = [1,2,3,4,5];

  var max = a.reduce(function(a,b){return a>b ? a:b;});
  var sum = a.reduce(function(a,b){return a+b;});
  ```

  空数组调用无初始值的reduce会报错，调用由初始值的reduce会直接返回这个初始值。

  reduceRight从右到左计算。

* `indexOf(target, begin) 和 lastIndexOf()`

  找索引，找不到返回-1

  target是要找的元素，begin（可选）代表从哪个索引开始找，没有的话从头开始找。

  字符串也有这两个方法

* 数组类型

判定是否为数组

```js
Array.isArray(obj);
```

ES3里判断它的类是不是"Array"

* 类数组对象

把拥有属性length和非负整数属性的对象看做“类数组对象”。

对类数组对象调用数组方法：

```js
var a = {'1': 1, '2': 2, '3': 3};

Array.prototype.join.call(a, '-');
> "1-2-3"
Array.prototype.slice.call(a, 0);
> ["1", "2", "3"] //真正数组的副本
```

* 作为数组的字符串

ES5中，字符串类似于只读的数组。

除了用`charAt()`访问单个字符，还能通过方括号。

**【WARNING】字符串是不可变值**，用`pop()`、`reverse()`等方法在字符串无效，还会带来错误，而且没有提示（WTF）

经尝试在chrome里有提示，s.xxx is not a function
