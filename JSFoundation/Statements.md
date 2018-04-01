# 控制结构

## 条件

* if
* switch

## 循环

* for
* while
* do while
* for in(数组或者对象)

## 转跳

* 标签语句

      label:statement;
    
    continue和break可以带标签

* return
* break
* throw
* try catch finally

 ps:使用finally语句可以用while模拟for

 ## 其他

 * with语句
   
   临时扩充作用域链

       with(obj){
           statements;
       }
       /*将obj临时添加到作用域链头部，并执行statements*/
    
    严格模式下禁用with，非严格模式也不建议使用with，因为它难以优化，而且同没有with的代码相比执行的更慢

    记住：只有在查找变量时才会用到作用域链，创建新的变量不用

        with(o) x=1;
        
    若对象o中存在x属性，则给它赋值1，否则和没有with(o)一样

* debugger
  
  当调试程序可用的时候，产生一个断点。

        function(o){
            if(o === undefined) debugger;
            /*如果传入的o是undefined，程序会停止执行，此时可以通过调试器查找产生错误的原因*/
        }

* "use strict"

  ES5引入的一条指令（不是语句），说明后续代码会解析为严格代码(strict code)

  * 禁用with
  * 所有变量必须事先声明
  * 调用函数（不是对象方法）中的this值是undefined。非严格模式是全局对象
    
        /*判断是否支持严格模式*/
        var hasStrictMode = (function(){"use strict"; return this===undefined})();
        
  * 通过call()和apply()调用函数时，this的值永远是第一个参数
  * 给只读属性赋值，给不可拓展对象增加新成员都会报错。非严格模式只是简单地操作失败，不报错
  * 函数的arguments对象有传入函数值的静态副本，而在非严格模式里，arguments数组的元素和函数参数指向同一个值
  * delete非法标识符报语法错，delete不可配置属性报类型错
  * 同一对象定义多个同名属性报错
  * 函数中存在同名参数报错
  * 限制调用栈的检测能力。arguments.caller和arguments.callee会报错

