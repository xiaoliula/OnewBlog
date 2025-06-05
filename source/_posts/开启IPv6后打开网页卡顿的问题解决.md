---
title: 开启IPv6后打开网页卡顿的问题解决
date: 2024-09-27 09:08:40
updated: 2024-09-27 09:08:40
tags: 
    - 网络
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11727399315950783.jpg
comments: true
cover: https://img.onew.us.kg/file/onew11727399315950783.jpg
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
ai: 本文主要介绍了作者开启 IPv6 后网页打开速度变慢，怀疑是 PMTU 黑洞问题。MTU 影响数据包传输，中间设备配置不当会导致 PMTU 黑洞。作者使用检测工具，将路由器 MRU 值从 1478 改到 1200，再次检测时打开速度加快。最后作者补充了 MTU 和 MRU 的概念及区别，虽改的是 MRU，但也解决了速度慢的问题。
---

# 前言
之前光猫桥接，路由器拨号开启了IPv6，开启之后始终感觉打开网页的速度慢了许多，在Google之后感觉可能是PMTU黑洞的问题。
# 关于PMTU黑洞
MTU (Maximum transmission unit) 是一条链路上可以通过的三层数据包的最大尺寸（包含 IP 包头）。以太网上默认的 MTU 是 1500 字节，但是你和目标服务器之间的路径上可能存在小于 MTU 1500 的链路。这条路径上最小的 MTU 值就是整条路径的 PMTU 值。路由器在转发包时，超过 MTU 大小的包会被分片（ Fragmentation ），也就是一个大包会被分切为多个不超过 MTU 的小包进行传输，传输效率会下降。

终端设备在发包时，也可以设置 DF （ Don't Fragment ）标记来告诉路由器不要分片。这时中间路由器会丢掉超过 MTU 的包，回复一条 ICMP Fragmentation Needed 消息。发送者收到这个包后，下次就会发小一点的包，这个过程叫做 PMTU Discovery 。现实中可以看到 HTTPS （ TLS ）的流量大都是带 DF 标记的。

然而，互联网上有大量的中间设备为了所谓的“安全”或者没有正确配置，不回应 ICMP Fragmentation Needed 包，这使得访问某些网站时如果某个包的大小超过了 PMTU，会被无声地丢弃，直到 TCP 协议发现超时丢包进行重传，这非常缓慢。遇到这种情况，我们可以说你和目标服务器的路径上存在 PMTU 黑洞。

此外，IPv6 不支持分片，换句话说可以理解为 IPv6 下所有的包都是带 DF 标记的。中间路由器在遇到包尺寸大于 MTU 的情况时，应该回应 ICMPv6 Packet Too Big 消息。同样的，由于种种原因，某些中间设备可能会直接丢包而不回应 ICMPv6 Packet Too Big 消息，直到 TCP 协议发现超时丢包进行重传。
# 解决方法
这里提供一个ipv6的检查工具 [http://icmpcheckv6.popcount.org/](http://icmpcheckv6.popcount.org/) ，建议在浏览器里打开这个站点。
站点页面的显示如下：

![image.png](https://img.onew.us.kg/file/onew11727398346163390.png)

翻译后：

![image.png](https://img.onew.us.kg/file/onew11727398385289433.png)

这时我的路由器中最大接受单元（MRU）的值是1478：

![image.png](https://img.onew.us.kg/file/onew11727398481561458.png)

我们需要把最大接受单元（MRU）的值修改为1200：

![image.png](https://img.onew.us.kg/file/onew11727398612210350.png)

再次打开 [http://icmpcheckv6.popcount.org/](http://icmpcheckv6.popcount.org/) 进行检测，页面显示如下：

![image.png](https://img.onew.us.kg/file/onew11727398674527314.png)

翻译如下：

![image.png](https://img.onew.us.kg/file/onew11727398694296164.png)

值得一提的是这次打开检测站点的速度快了很多，没有再出现转圈或者是响应超时的情况，这样从侧面说明这个问题已经解决了。

# 结语：
改了之后确实感觉速度快了很多，也不知道是不是心理作用，但是结果总归还是好的。

——————————————————————————————————————————
# 补充（关于MTU和MRU）
需要修改的是MTU，但我修改的是MRU，虽然不是同一个东西，可打开网页的速度却是真真实实的提升了，下面我们了解一下它们的概念和区别
## MTU和MRU概念
MTU（Maximum Transmission Unit，最大传输单元）。
MRU（Maximum Receive Unit，最大接收单元）。
MTU是以太网数据链路层概念，MRU是PPP链路数据链路层的概念.但是都是最大传输单元的意思
## MTU和MRU区别
### 方向：
MTU：主要与数据的发送有关，影响发送方能够发送的数据包大小。
MRU：主要与数据的接收有关，影响接收方能够处理的数据包大小。
### 应用场景：
MTU常用于以太网、IP协议等网络协议中，决定了最大数据帧的大小。
MRU通常在点对点协议（PPP）中使用，确定接收方处理数据的能力。
MTU和MRU都是与数据传输相关的参数，但MTU侧重于发送，而MRU侧重于接收。确保这两个值合理设置，可以提高网络的性能和稳定性。
## 总结
虽然设置的不是MTU而是MRU，但是也算是歪打正着了吧。