---
title: 将图片上传到七牛云会报错error=incorrect...
date: 2024-05-17 21:24:00
updated: 2024-05-17 21:24:00
tags: Java
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/15.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/15.webp
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
ai: 文章呈现了一段七牛云上传文件报错代码，报错信息为 “incorrect region” 。经分析，问题原因是创建七牛云存储空间时选择华南地区，而上传文件配置类中却是其他地区。解决办法是在配置 Configuration 类时，根据实际情况选择正确的 region 类型，并配有相关图片链接辅助说明。
---

# 报错代码：
```language
{ResponseInfo:com.qiniu.http.Response@377fbcac,status:400, reqId:e6sAAAAKAlyhUDwW, xlog:X-Log, xvia:, adress:up.qiniu.com/115.238.101.32:80, duration:0.000000 s, error:incorrect region, please use up-z2.qiniup.com}{"error":"incorrect region, please use up-z1.qiniup.com, bucket is: XXXXX"}
```
# 问题原因：
创建七牛云存储空间时选择了华南地区，但上传文件的配置类中配置了其他地区。
![image.png](http://onewa.fun/static/articlePicture/11725866636211138.png)
# 解决办法：
在配置Configuration类的时候，按需选择region的类型即可。
![image.png](http://onewa.fun/static/articlePicture/1172586667964010.png)