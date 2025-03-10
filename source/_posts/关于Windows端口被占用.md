---
title: 关于Windows端口被占用
date: 2024-05-17 21:13:00
updated: 2024-05-17 21:13:00
tags: Windows技巧
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/16.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/16.webp
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
ai: 本文介绍了在 cmd 中查看被占用端口的 pid 的方法，使用 “netstat –aon |findstr “xxxxx”” 命令，其中 “xxxxx” 为目标端口号；还介绍了关闭找到端口被占用对应的 PID 的命令 “TASKKILL /PID xxxxx /F” ，并配有相关操作示例图片链接辅助说明。
---

# cmd查看被占用端口的pid
```language
netstat –aon |findstr “xxxxx”
```
# 关闭找到端口被占用对应的PID
```language
TASKKILL /PID xxxxx /F
```
如：
![image.png](http://onewa.fun/static/articlePicture/11725866789961279.png)