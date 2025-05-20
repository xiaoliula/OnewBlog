---
title: 关于免费域名注册托管到cf以及开启CDN加速
date: 2024-09-12 14:06:45
updated: 2024-09-12 14:06:45
tags: 域名
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11726800156562963.jpg
comments: true
cover: https://img.onew.us.kg/file/onew11726800156562963.jpg
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
ai: 文章分享了多个可免费注册域名的网址，如 dynv6、nic.eu.org、clouddns.net、US.KG ，分别介绍其特点、注册方式及优缺点。还详细演示了将 US.KG 域名托管到 cf 的步骤，以及提及白嫖 cf 的 ssl 证书和开启 CDN 加速可参考 B 站 “技术爬爬虾” 的相关视频。
---

# 能够免费注册域名的网址
首先是[dynv6](https://dynv6.com/)，这个网址能注册dynv6的子域名，也可以把域名托管到dynv6，使用ddns-go进行动态解析，免去了手动更新IPv6地址的麻烦。因为是二级域名，不能托管到cf，还有就是注册方便，不用真实的邮箱就能够注册。

![image.png](https://img.onew.us.kg/file/11726117618657892.png)

其二就是[nic.eu.org](https://nic.eu.org/)，eu.org是1996年开始运营的公益域名服务。其设立的主要目的是为那些无力支付付费域名的高额费用的用户或非盈利组织提供永久（至少在2030年之前不会过期）免费且不限量的顶级域名，每个注册用户都可以申请不限量的eu.org域名而且还可以托管到cf。只有一个缺点，就是申请的审核周期很长（可能长达数个月）。申请的时候需要用到真实的邮箱地址以及可以使用虚拟的个人身份信息。（具体的步骤网上有很多，可以参考	[技术爬爬虾](https://www.bilibili.com/video/BV1by411B7Ko/?spm_id_from=333.999.0.0&vd_source=b8b8efdf29404c2fc61dbf5ffffd439a)，就不过多叙述了，这里主要分享免费域名注册）

![image.png](https://img.onew.us.kg/file/11726118134357498.png)

第三个就是[clouddns.net](https://www.cloudns.net/)，ClouDNS是欧洲最大的全球托管DNS服务提供商，包括GeoDNS，Anycast DNS和DDoS保护的DNS。虽然是一个二级域名，但是能够白嫖呀！外加永久buff，这能不心动？注册的时候能够使用QQ邮箱注册，也比较简单，缺点就是只能注册一个免费的二级域名。

![image.png](https://img.onew.us.kg/file/11726118755301318.png)

最后一个就是[US.KG ](https://nic.us.kg/)，这个网址能够注册三个免费的域名，每次能申请一年，只需要每过了半年就可以进行一次续费，而且是免费续费。注册的时候是可以用谷歌账号登录，也可以虚拟信息配合QQ邮箱进行注册。

![image.png](https://img.onew.us.kg/file/11726119144156866.png)

# 托管到cf
这里托管就用us.kg的域名进行演示，可以提前注册一个cf的账号。域名申请好后进入cf的控制面板，点击添加域

![image.png](https://img.onew.us.kg/file/11726119441048703.png)

输入刚才你注册的域名

![image.png](https://img.onew.us.kg/file/11726119504742103.png)

点击继续，然后往下滑，选择免费，然后无脑下一步

![image.png](https://img.onew.us.kg/file/11726119683836745.png)
![image.png](https://img.onew.us.kg/file/11726119686825748.png)

添加完成后上方显示待处理...，先不用管，点击DNS

![image.png](https://img.onew.us.kg/file/11726119776986437.png)

往下滑，找到这个

![image.png](https://img.onew.us.kg/file/11726119810290585.png)

复制下来，然后打开us.kg的控制台页面，在首页往下滑找到manage my domains

![image.png](https://img.onew.us.kg/file/11726119947867881.png)

点击进入选择你要托管的域名，把刚才复制下来的分别填入第一和第二个方框就OK了

![image.png](https://img.onew.us.kg/file/11726120034043120.png)

接下来就等待状态从第一个变成第二个就大功告成了

![image.png](https://img.onew.us.kg/file/11726120124786280.png)

# 白嫖cf的ssl证书
这里我参考的是B站[技术爬爬虾](https://www.bilibili.com/video/BV1by411B7Ko/?spm_id_from=333.999.0.0)的视频
# 关于开启CDN加速
这里[开启CDN加速](https://www.bilibili.com/video/BV1SM4m1176E/?spm_id_from=333.999.0.0)的视频我参考的也是技术爬爬虾，[技术爬爬虾](https://space.bilibili.com/316183842)还是很有实力的