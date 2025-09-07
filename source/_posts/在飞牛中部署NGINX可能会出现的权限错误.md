---
title: 在飞牛中部署NGINX可能会出现的权限错误
date: 2025-8-24 21:07:00
updated: 2025-8-24 21:07:00
tags:  
    - 飞牛
    - NGINX
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/1756041374307_spacexcode-coverview-1547@2x.png
comments: true
cover: https://img.onew.us.kg/file/1756041374307_spacexcode-coverview-1547@2x.png
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
ai: 文章介绍了使用 MinIO 进行文件上传的步骤：添加依赖：在 pom.xml 中添加 MinIO 依赖，然后刷新 Maven 项目。新建 Maven 项目：给出示例代码，包含 MinIO 客户端初始化、检查存储桶是否存在（不存在则创建）以及使用文件流上传文件的逻辑。展示上传结果：附上了上传结果的图片。
---

# 前言
想着最近飞牛也差不多应该成熟了吧，于是最近把之前的黑群晖给换成了飞牛。

# 再续前缘
部署好了飞牛之后又想着把之前的博客部署看看是个什么情况，这个系统的占用会不会少一点呢？因为我经常迁移这些东西，所以我都是用docker部署的。

# 遇到的难题
但是在今天我部署那个博客的时候遇到了点问题，部署出来访问网址会出现如下错误（403）

![image.png](https://img.onew.us.kg/file/1756041687629_Snipaste_2025-08-24_21-21-05.png)

如图，显示的是403 Forbidden，也就是文件权限和所有权设置不正确，但是之前在华为云上的服务器和黑群晖都能正常运行啊，所以就很迷茫，而且nginx也报错了

![image.png](https://img.onew.us.kg/file/1756041894614_Snipaste_2025-08-24_21-24-20.png)

看着图中的Permission denied我貌似知道了原因了，很大概率是飞牛的权限与其他服务器不一样

# 解决方案
后来经过在网上查阅资料发现了问题所在，因为Nginx在Linux里会新建默认user为www-data的用户，用户组不一致，导致访问总是403，所以在这个nginx.conf文件里需要强调一下

![image.png](https://img.onew.us.kg/file/1756042170537_image.png)

添加 {% kbd user root; %} 即可

# 效果
OK，可以正常访问了

![image.png](https://img.onew.us.kg/file/1756043594986_image.png)

# 结语
所以我感到很奇怪的是为什么在飞牛上会有这个问题而黑群晖和云服务器没有这个问题呢？(至于我为什么不继续用这个博客纯粹是因为没钱，没钱买服务器、套cdn、持续运营)