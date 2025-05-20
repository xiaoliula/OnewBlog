---
title: 关于外网无法通过域名访问Nas
date: 2024-09-18 11:03:38
updated: 2025-03-09 21:17:05
tags: 
    - Nas
    - 服务器
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/27.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/27.webp
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink: false
aside: true
# swiper_index: 10
# top_group_index: 10
background: "#fff"
ai: 本文主要介绍了作者在折腾Nas时遇到外网无法通过域名访问的问题，路由器拨号且有公网IPv6，经ddns-go解析到cf、域名托管在cf、开了小黄云并做了端口转发。排查中曾以为是路由器问题，后发现不是。先后关掉origin rules中Nas及blog的端口转发，问题依旧；关掉小黄云仍无法访问，后用手机5G测试有IPv6地址，通过域名加端口号可访问。但关闭主力域名小黄云有暴露Nas IP风险，最终解决方案是用另一个域名映射且不开小黄云，主力域名小黄云正常开着，origin rules端口转发打开。补充提到做Nas端口转发会报错，认为可能是域名原因。更新中指出无法访问原因是Cloudflare半程SSL导致握手失败，解决方法是在Cloudflare设置子域名SSL严格模式。 
---

# 前言
最近在折腾Nas，然后卡在了外网没法通过域名访问Nas这，在网上也查阅了很多资料，但是都没有我这种情况，我的情况是路由器拨号，开启了公网IPv6，通过ddns-go解析到cf，域名托管在cf，开启了小黄云，在cf的origin rules做了端口转发（不知道我说的对不对，就是可以不用带端口号访问），Nas开放了端口。排查来排查去一直以为是路由器的问题，甚至都准备换一个路由器了，后来在群友的解释下也才知道和路由器没有一毛钱关系

![image.png](https://img.onew.us.kg/file/onew11726626224218457.png)

我就想着是不是域名的问题，因为我在我的主力域名做了很多设置，于是就开始了排查域名的问题
# 关掉origin rules中的端口转发
我在origin rules中做了两个端口转发，一个是我的博客，另外一个是Nas，博客是一直能够访问的，只有Nas无法访问，于是关掉了Nas的端口转发，但是仍旧无法访问

![image.png](https://img.onew.us.kg/file/onew11726626618083877.png)
![image.png](https://img.onew.us.kg/file/onew1172662672149388.png)

将blog的端口转发也关掉，仍旧无法访问，那么就确定了不是origin rules的问题

![image.png](https://img.onew.us.kg/file/onew11726626763832676.png)
![image.png](https://img.onew.us.kg/file/onew1172662672149388.png)

# 关掉小黄云
我在cf托管域名为了安全是把小黄云开启了的，主要是怕被挖到源IP地址，通过ddns-go解析上来

![image.png](https://img.onew.us.kg/file/onew11726626918194150.png)

因为blog和Nas的端口转发都关了，所以也和那俩的解析没什么关系了，我先试着关掉主力域名的小黄云看能不能访问

![image.png](https://img.onew.us.kg/file/onew11726627105531497.png)

很不幸，仍旧无法访问，后来想起来是不是IPv4无法访问到IPv6的原因，因为是在图书馆连图书馆的WiFi就没有考虑过这个问题，于是用手机的5G进入IPv6测试网站（我不确定是不是5G才有IPv6，只能先从5G开始）

![image.png](https://img.onew.us.kg/file/onew11726627388735382.png)

OK，有IPv6地址，连上热点

![image.png](https://img.onew.us.kg/file/onew11726627522568654.png)

输入域名加上端口号进行测试

![image.png](https://img.onew.us.kg/file/onew11726627158344489.png)

很好，通过域名加上端口号能够顺利访问

# 弊端
虽然这样能够解决我的问题，但是关闭了我的主力域名的小黄云也就意味着能够通过我的博客IP地址从而找到我的Nas的IP地址（因为博客是部署到Nas上的）

![image.png](https://img.onew.us.kg/file/onew11726627812617825.png)

## 解决方案
我用我的另外一个域名不开小黄云，同样用ddns—go进行映射，主力域名的小黄云正常开着，同时，origin rules的端口转发也打开（Nas的Dns记录和端口转发可以删掉了，我截图的时候忘了）

![image.png](https://img.onew.us.kg/file/onew11726628008993337.png)
![image.png](https://img.onew.us.kg/file/onew11726628026988980.png)
![image.png](https://img.onew.us.kg/file/onew11726627970010853.png)

输入另外一个域名加上IP地址，同时，测试主力域名能否访问

![image.png](https://img.onew.us.kg/file/onew11726628210089146.png)
![image.png](https://img.onew.us.kg/file/onew11726628276292118.png)

OK，主力域名无法访问，另外一个域名能够顺利访问，完美解决，perfect！

# 结语
虽然这个问题看着很轻易的就解决了，但是这个问题困扰了我好几天，而且在测试的过程中我发现我的另外一个域名挂掉了，这就导致了在解决问题的过程中添加了难度。因为当时并不知道这个域名挂了，直到昨天打开那个域名跳转到了反诈页面才知道挂了。只不过总的来说结果还是好的，我可以继续做我该做的事情咯！

——————————————————————————————————————————
# 补充
有人问我为什么现在不做Nas的端口转发了，这我也试过，但是访问页面会报错，报错如下所示
```language
The plain HTTP request was sent to HTTPS port
```
因为访问群辉会自动跳转到https，然后显示次连接不安全，我认为还是我域名的原因，虽然在cf能够白嫖证书，但是有点能力还是买国内的域名吧，毕竟稳才是最重要的，万一哪天cf全被墙了就啥也没了。

——————————————————————————————————————————
# 更新（2025年3月9日21:17:05）
最近找到无法通过域名访问Nas的具体原因了，其实就是因为使用了 Cloudflare 的半程 SSL ，也就是说 Cloudflare 到我的Nas没有使用 SSL ，这就会导致握手失败。而解决方法就是 Cloudflare 指定子域名 SSL 严格模式。通过 Cloudflare 设定 Configuration Rules，设定自定义筛选表达式。
当传入请求匹配时…
|字段|运算符|值|
|-|-|-|
|URI完整|包含|你想设定严格 SSL 的的子域名|
则设置将为…
SSL：严格
这样，我遇到的问题就可以完美解决了，可以通过域名访问 Nas 而且带有 Cloudflare 的免费证书了（IPv4和IPv6均可访问）。