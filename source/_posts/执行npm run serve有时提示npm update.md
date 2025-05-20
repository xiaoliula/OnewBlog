---
title: 执行npm run serve有时提示npm update
date: 2024-05-17 21:55:00
updated: 2024-05-17 21:55:00
tags: Vue
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/14.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/14.webp
toc:
toc_number:
toc_style_simple:
copyright: 
copyright_author: Borislav Hadzhiev
copyright_author_href:
copyright_url:
copyright_info: 本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明来自 Borislav Hadzhiev！
mathjax:
katex:
aplayer:
highlight_shrink: false
aside: true
# swiper_index: 10
# top_group_index: 10
background: "#fff"
ai: 文章围绕 “npm update check failed” 错误展开，虽该错误无关紧要，但出现时会带来困扰。错误提示配有相关图片链接。解决方法是删除 configstore 目录，在 Windows 上，该目录位于 “C:\Users<username>.config\configstore” ，可手动删除或用 “rd /s/q "C:\Users<username>.config\configstore"” 命令删除，且需将<username>替换为实际用户名。此解决方法引自 Borislav Hadzhiev 的博客，附原链接。
---

# 背景
这个错误虽说无关紧要，但有时候会出现就感觉不爽。
# 错误提示
![image.png](https://img.onew.us.kg/file/11725866378513924.png)
# 解决方法
在网络上查阅资料后才知道是因为文件夹权限的问题
1. 删除目录configstore
由于权限问题，该目录经常出现故障。
如果删除该目录，则下次运行命令时将重新生成该目录。
2. 在 Windows 上删除configstore
在 Windows 上，该目录位于
```language
C:\Users\username\.config\configstore
```
请确保将{% label username %}的占位符替换为您的实际用户名，
转到该文件夹并删除该文件夹，或者，您可以使用命令删除该文件夹。
```language
rd /s /q "C:\Users\username\.config\configstore"
```
请务必将{% label username %}替换为您的实际用户名。尝试在删除文件夹后发出命令。

声明：该解决方法引自于 Borislav Hadzhiev 的博客，原解决方法的链接为：https://bobbyhadz.com/blog/npm-update-check-failed