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

```
    
    |请求报文
    | ---
    | GET / test/hi-there.txt HTTP/1.0
    | Accept: text/*
    | Accept-Language: en,fr..
    | ..ets

    |响应报文
    | ---
    | HTTP/1.0 200 OK
    | Content-type: text/plain
    | Content-length: 19
    | Hi! I'm a message.

```


