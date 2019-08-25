# http-study
learn http

## Http 学习 前端缓存等相关知识

### Http 在web开发中的一些应用，比较重要，头信息意义

##### Cache-Control - last-modified - Etag

    ```
        redirect ---> App cache ---> DNS ---> TCP ---> Request ---> Response

        browser 输入url 到 http返回的过程

    ```

###### 网络协议

+ 经典五层模型
    ```
        |---应用层      --> http FTP...        
        |---传输层      --> TCP,UDP       
        |---网络层             
        |---数据链路           
        |---物理层 

        <低三层>
        物理层主要是定义物理设备如何让传输数据
        数据链路层在通信的实体间建立数据链路连接
        网络层为数据节点之间传输创建逻辑链路

        传输层
        向用户提供可靠的端到端的服务
        向高层屏蔽了下层数据通信的细节

        应用层
        为应用软件提供了很多服务
        构建于TCP协议置上
        屏蔽网络传输相关细节

        发展历史
        1. http0.9  只有一个get  没有header等描述信息 服务器发送完毕之后，TCP就被关闭了

        2. http1.0 增加了很多命令 增加了status code和header 多字符集的支持、多部分发送、权限、缓存等

        3. http1.1 支持持久连接 pipeline（按顺序接受连接） 增加了host和其他一些命令（host增加表示不同的web服务）

        4. http2.0 所有数据以2进制传输 同一个连接发送多个请求 头信息压缩以及推送提高效率的功能 

    ```
+ 三次握手

```

    user  -----------------> TCP connection <-------------- server

                    |-----      http request     ------|

                  client                            server

                    |-->-->     SYN=1,Seq=X     --->-->|

                    |<--<-- SYN=1,ACK=X+1,Seq=Y <--<---|

                    |-->-->     ACK=Y+1,Seq=Z   --->-->|

                    < ==    ACK返回是上一次Seq值加一  == > 

```

+ URI Uniform Resource Identifier 统一资源标志符
+ URL Uniform Resource Locator 统一资源定位器

###### HTTP报文

    | 请求报文 
    | ---
    | GET / test/hi-there.txt HTTP/1.0 
    | Accept: text/* 
    | Accept-Language: en,fr.. 
    | ..ets 

    | 响应报文 
    | ---
    | HTTP/1.0 200 OK 
    | Content-type: text/plain 
    | Content-length: 19 
    | Hi! I'm a message. 

+  http method: get --->   post ---> put ---> delete 有各自的语义
+  http code: 100-199 200-299 300-399 400-499 500-599 掌握常用的code含义

### sample server Http demo 

```
    |--- src
        |--- http
            |--- server
            |--- html
```

## Request 

+ 使用curl 可以在 git bash 面板看到不同的http的信息报文

+ 输入 curl -v www.baidu.com 获取到返回的东西和报文信息

### 跨越的概念

+ Access to XMLHttpRequest at 'http://127.0.0.1:8887/' from origin 'http://127.0.0.1:8888' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

+ 设置 'Access-Control-Allow-Origin':  '*' 所有都能访问
+ 可以是使用JSONP进行请求 或者设置 Access-Control-Allow-Origin 为指定域才能访问

#### 预请求和验证
+ CORS请求 默认允许的方法 是get post head  , put delete 等需要预验证 （method）
+ CORS请求 允许的Content-Type 为 text/plain  multipart/form-data application/x-www-form-urlencoded 数据类型 其他的必须验证过 （Content-Type）
+ 还有其他的请求头必须预验证
+ 请求是发送出去了，但是浏览器会block掉，因为了CORS的策略
+ 预请求的的method是options，通过它到服务端进行验证，如果验证过了，就会发送我们期望的请求
 
## 缓存 cache-control
### 可缓存性 cache-control
+ public 指在http返回的经过的路径当中，包括代理服务器，浏览器都可以缓存这份数据
+ private  指只有发起http请求的一方才可以进行缓存
+ no-cache  都不让缓存

#### 到期
+ max-age=<secondes> 到期时间 秒 多少秒之后
+ s-maxage=<secondes> 设置代理服务器的缓存到期时间 在代理服务上优先读取s-maxage的时间作为缓存到期时间
+ max-stale=<secondes> 是发起请求的一方它主动带的请求头，即使是max-age到期，但是有这个参数，那么浏览器也判断不需要重新到服务器拉取新的内容会来 （只有发起方）

#### 重新验证
+ must-revalidate 已经过期了，那么就必须去服务器验证，
+ proxy-revalidate 代理服务器缓存时间到期，那么就必须去服务器验证

#### 其他 
+ no-store 彻底不能缓存请求内容
+ no-transform 不允许进行数据的一些转换，比如压缩等（代理服务器端）


###### 设置 cache-control 的值 添加内容的hash码，内容变化，则会打包时候，文件名会变化

## 资源验证


```
        ----> Browser
        ^        |    
        |        |
        |        |
    如果命中  创建请求
        |        |
        |        |  
        <---- local cache ----未命中------> 代理服务器 -----未命中--------> 源服务器
                |                            |
                |                            |
                ----<---- 命中 ----<----------                     

```

+ 验证头 Last-Modified  ETag
+ Last-Modified 上次修改时间 配合使用的是 If-Modified-Since or If-Unmodified-Since
+ 对比 If-Modified-Since 以验证资源是否需要更新
+ ETag 数据签名 严格验证 常见的是对资源内容进行hash计算  配合使用的是If-Match or If-Non-Match
+ 对比资源的签名是否使用缓存


