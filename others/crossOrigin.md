# 跨域及其解决方案

## 跨域

广义的跨域是指一个域下的文档试图去请求另一个域下的资源，如：

* 资源转跳：a标签、重定向、表单提交
* 资源嵌入：\<link>、\<script>、\<img>、\<frame>等DOM标签，还有CSS中的background:url()、@font-face()等文件外链
* 脚本请求：js发起的ajax请求、dom和js对象的跨域操作等

狭义的跨域是指浏览器同源策略限制的一类请求场景

## 同源策略(Same Origin Policy,SOP)

它是一种浏览器的安全机制，由Netscape公司于1995年引入浏览器。如果没有它，浏览器会很容易遭受XSS、CSFR等攻击。

它要求三方面的“同源”：

* 协议相同
* 域名相同
* 端口相同

同源策略限制以下三种行为：

* Cookie、LocalStorage和IndexDB无法读取
* DOM和JS对象无法获得
* AJAX请求不能发送

## 同源策略限制下的跨域解决方案

### 1.JSONP(JSON with Padding,填充式JSON)

原理：通过```src```引用的跨域请求是被浏览器允许的，故可以通过动态创建```script```标签，用它的```src```属性去请求跨域资源，请求的结果应为一个包含函数调用的脚本代码。

*因为是用src实现的，所以只能实现GET请求*

例如：

```js

<script>
    var script = document.createElement('script')
    script.type = 'text/javascript'

    //请求资源并指定回调函数为onBack
    script.src = 'http://www.thisisadomain.com/sth?callBack=onBack'
    document.head.appendChild(script)

    //定义要执行的回调函数
    function onBack(res) {
        //do something with res
    }
</script>

/*
#服务器端返回示例："onBack({foo:bar, foz: baz})"
该内容作为新创建的script标签的代码，立即执行，就是调用了实现定义的onBack函数并给它传了一个特定的参数{foo:bar, foz:baz}
*/

```
使用jQuery的ajax方法可以简化这一过程

```js

$.ajax({
    url: 'http://www.thisisadomain.com/sth',
    type: 'GET',
    dataType: 'jsonp',
    jsonpCallback: 'onBack',
    data: {}
})

function onBack(res) {
    //do something with res
}

```

### CORS(Cross-Origin Resource Sharing, 跨域资源共享)

CORS是一种W3C所推荐的跨域请求方法，它需要客户端和服务器端协同完成验证。

#### 客户端验证

主流浏览器会对动态的跨域请求进行特殊的验证处理，分为*简单请求验证处理*和*预先请求验证处理*

**简单请求验证处理**

当请求同时满足以下两个条件时，浏览器会直接发送请求，并在该请求中做跨域权限的验证。

* 请求方法是GET、POST或者HEAD
* Content-Type是application/x-www-form-urlencoded、multipart/form-data或者text/plain

处理过程：

1. 浏览器直接发送跨域请求，并在请求头中携带```Origin```的请求头，表明这是一个跨域请求
2. 服务器接到请求，根据自己的跨域规则，返回的相应的响应头来验证结果。验证成功响应头中包括```Access-Control-Allow-Origin```和```Access-Control-Allow-Methods```。当验证成功时会直接返回资源内容，否则返回403Forbidden
 
**预先请求验证处理**

当请求不满足简单处理验证的条件时，浏览器会事先发送一个OPTION请求，来与后台协商是不是可以发送实际的跨域请求。

处理过程：

1. 浏览器发送预先验证请求(Preflighted Request)，它是一个OPTION请求，用于询问服务器能不能发送实际的跨域请求。该请求包含```Origin```、```Access-Control-Request-Headers```和```Access-Control-Request-Method```三个请求头。
2. 服务器接到请求，根据自己的跨域规则，返回相应的请求头来验证结果。验证成功响应头中包含```Access-Control-Allow-Oringin```、```Access-Control-Allow-Headers```和```Access-Control-Allow-Method```。验证失败返回403Forbidden
3. 如果验证通过，浏览器发送真正的跨域请求(只带```Origin```那种)。如果验证不通过，浏览器不会发送真正的跨域请求。

**带认证的请求**

跨域请求默认不提供凭证(Credentials, 如Cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials设为true，可以指定某个请求发送凭据。

服务器在接收到这样的请求时，如果验证成功会在响应头加入```Access-Control-Allow-Credentials:true```。服务器还可以在Preflight响应中加入这个头表示允许源发送带凭证的跨域请求。

如果发送的是带凭证的请求，但是响应头中没有```Access-Control-Allow-Credentials:true```，那么客户端不会把响应交给javaScript。此时responseText为空字符串，size为0。

当发送带凭证的请求时，响应头中的```Access-Control-Allow-Origin```必须为明确的域名，不能使用'\*'这样的通配符。

#### 服务端验证

1. 查看请求头有没有Origin字段
2. 如果没有Origin字段或者Origin字段不被允许，则当成普通请求处理，结束。
3. 如果有且被允许，则看是不是preflight
4. 如果不是preflight，就返回Allow-Origin、Allow-Credentials、Allow-Methods等，并正常返回内容
5. 如果是preflight，则返回Allow-Headers、Allow-Method等，返回内容为空