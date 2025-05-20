---
title: Spring使用Undertow作为嵌入式服务器中遇到的问题
date: 2024-05-26 15:24:00
updated: 2024-05-26 15:24:00
tags: Java
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/10.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/10.webp
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
ai: 做毕业设计时，使用 Undertow 作嵌入式服务器上传文件限制代码不生效，只能上传 1MB 内图片，配置文件设置 10MB 仍报错。经多轮排查无果，最终发现是 application.yml 里 servlet 缩进未与 datasource 对齐所致。
---

# 背景：
在做毕业设计的时候发现了使用 Undertow 作为嵌入式服务器上传文件限制的代码不生效，只能上传1MB以内的图片，一旦上传超过1MB的图片就会报错。
# 代码：
```language
spring:
  datasource:
    hikari:
      idle-timeout: 600000  #10 min
      max-lifetime: 1800000 #30 min
    servlet:
      multipart:
        max-file-size: 10MB
        max-request-size: 10MB
```
# 错误提示：
```language
The maximum size 1048576 for an individual file in a multipart request was exceeded
```
# 解决思路：
一开始以为是Java代码本地的配置覆盖了application.yml或代码中设置了最大文件，但是排查了很久都没有发现问题。然后又去排查检查是否缺少其他 Spring Boot 自动配置与 Undertow 文件上传大小的配置发生冲突，但是，排查完了发现都不是这些问题。
# 解决方法：
最后都准备放弃了，想着再检查一遍application.yml配置文件，结果发现是缩进的原因，servlet没有和datasource对齐！！就很气，也很搞笑，就那么个简单的问题，一直迷迷糊糊的没有找到。。。
![image.png](https://img.onew.us.kg/file/11725863455928468.png)

