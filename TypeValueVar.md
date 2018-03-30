# 数字
JS不区分整数值和浮点数值，所有数字均为浮点数。使用64位浮点格式表示数字。当一个数字直接出现在JS程序中，称之为**数字直接量**。加负号可以得到数字的负值，但是负号是一元求反运算符，不是数字直接量的语法组成部分。

## 整型直接量
* 一个数字序列表示十进制数
* 0X或者0x开头的表示16进制
* 0开头表示8进制，但是有些JS的实现不支持。ES6的严格模式下，禁止使用8进制，尽量不要用。

## 浮点型直接量
```
[ digits ][ .digits ][ ( E|e )[ ( +|- )] digits ]
```
## 算术运算
+加 -减 *乘 /除 %取余

Math对象常用函数、常量：
* Math.pow(2,3)
* Math.round(6.1)
* Math.ceil(2.3)
* Math.floor(2.3)
* Math.abs(-1)
* Math.max(x, y, z)
* Math.min(x, y, z)
* Math.random()
* Math.PI
* Math.E
* Math.sqrt(3)
* Math.sin(0) //类似还有cos和atan等
* Math.log(10)
* Math.log(512)/Math.LN2 //以2为底512的对数
* Math.exp(3) //e的三次幂

JS中overflow、underflow和dividedByZero都不会报错。

正数overflow结果为Infinity，负数overflow为-Infinity，基于二者的加减乘除运算仍为同符号的无穷大。

正数underflow结果为0， 负数为-0，0==-0结果为true。

DividedByZero返回相应的Infinity，但0/0是个例外，其结果为NaN。Infinity/Infinity、负数开方、算术运算符与非数字或无法转换为数字的值进行运算均为NaN。NaN有个很神奇的特性，它和任何值都不相等。判断一个值x是不是NaN，不能用x == NaN，应该用x != x

Number对象:
* Number.POSITIVE_INFINITY
* Number.NEGATIVE_INFINITY
* Number.MAX_VALUE
* Number.MIN_VALUE

## 二进制浮点数表示和四舍五入错误
JS采用二进制浮点表示法，可以精确的表示1/2 1/4 1/1024之类的数，但是对于1/10 1/1000等就只能近似表示。

例如：
```
var x = .3 - .2;
var y = .2 - .1;
x == y //false
```
所以在重要的计算中尽量使用大整数进行计算，例如金融计算要使用“分”作为单位而不是“元”。

## 日期和时间
日期和时间的核心是Date()构造函数，创建一个表示日期和时间的对象。

用法示例：
```
var then = new Date(2011, 0, 1); //2011年1月1日
var later = new Date(2011, 2, 3, 17, 10, 23); //2011年3月3日下午5点10分23秒
var now = new Date() //当前时间
var elapsed = now - then; //日期减法，得到的是时间间隔的毫秒数
now.getFullYear() //2011,不要用getYear,因为在FF浏览器里会返回当前年份-1900
now.getMonth() //从0开始计数的月份
now.getDate() //从1开始计数的天数
now.getDay() //周几，0表示周日，**5表示周一？？？**
now.getHours() //当地时间
now.getUTCHours //UTC表示的时间
```
# 文本
字符串是一组由16位值组成的不可变的有序序列，每个字符通常来自Unicode，JS通过字符串类型表示文本。

## 字符串直接量
* 单双引号均可，但是在客户端JS中，HTML和JS字符串最好用不一样的，一般HTML双引号，JS单引号
* ES3中，字符创必须在一行里。ES5中，字符串可以拆分为数行，每行必须以反斜线(\\)结束

## 转义字符
略

## 字符串的使用
* 加号拼接
* 可以看做一堆字符组成的数组
* length
* charAt(0)
* substring(1, 4)
* indexOf('o', 3) //位置3及以后首次出现的'o'的位置，第二个参数默认为0
* lastIndexOf()
* split()
* replace()
* toUpperCase()

## 模式匹配、正则表达式
核心：RegExp()构造函数 [RegularExpression Tutorial](http://www.runoob.com/regexp/regexp-tutorial.html)

# 布尔值
true or false

# null 和 undefined
* typeof null => object 
* typeof undefined => undefined
* null == undefined //true
* null === undefined //false

# 全局对象 global object
当JS解释器启动时，它会创建一个新的全局对象，并给它一组定义的初始属性：
* 全局属性，如undefined, Infinity和NaN
* 全局函数，如isNaN(), parseInt()和eval()
* 构造函数，如Date(), RegExp(), String(), Array()
* 全局对象，如Math, JSON
在代码的最顶级，可以使用this来引用全局对象。在客户端JS中，Window对象充当了全局对象，可通过其属性window引用自身。声明全局变量时，它成为全局对象的一个属性。

# 包装对象
字符串、数字、布尔值都不是对象，但是都有自己的方法、属性等。比如：
```
'hello'.length //=>4
```
上面实际上是执行了```(new String('hello")).length```，随后将这个临时对象销毁。

在存取字符串、数字、布尔值的属性时临时创建的对象称作包装对象。也可以通过String(), Number()等来显式创建包装对象。
```
var S = new String(s);
S.length //即s.length
S == s //true
S === s //false
```

注意这段代码：
```
var s = 'helo';
s.len = 4;
var t = s.len; //t的值为undefined
```

# 不可变的原始值和可变的对象引用
原始值：undefined，null，布尔值，数字，字符串不可变

对象：数组、函数等可变，对象的值都是引用，对象的比较是引用的比较，当引用指向同一对象时他们才相等

若要比较对象的内容，必须显式地比较

# 类型转换

* 空字符串、0、NaN、null、undefined转化为布尔值为false，其他为true
* 把null和undefined转为对象会导致TypeError

## 转换和相等性
```
null == undefined
"0" == 0
0 == false
"0" == false
```
以上结果均为true，但是===就是false

## 显式类型转换
* Number(), String(), Boolean()等构造函数
* Number类的toString()方法，可接收基数作为可选参数
* Number类的toFixed()//小数点后几位, toExponential()//指数形式，参数为小数点后位数, toPrecision()//有效数字位数
* 全局函数parseInt(), parseFloat()，他们和Number()的区别是，Number不允许出现非法的尾随字符，且只能基于十进制转换。而上述两个可以跳过任意前导空格，并忽略后面的内容。若字符串前缀为"0x/X"，会把它解释为16进制数。parseInt()可选第二个参数作为基数(2-36)

# 变量声明

# 变量作用域