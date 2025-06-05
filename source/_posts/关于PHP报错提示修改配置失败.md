---
title: 关于PHP报错提示修改配置失败
date: 2024-09-14 14:31:10
updated: 2024-05-14 17:21:00
tags: 
    - PHP
    - 服务器
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/26.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/26.webp
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
ai: 本文主要介绍在将基于 PHP7.4 的项目部署到 Nas 时，因配置失败报错，排查发现是权限问题，config.php 权限为 755，PHP 进程无法写入。具体解决步骤：调整文件权限为 664、目录权限为 775；更改文件和目录所有者为 PHP 进程用户（通常为 www-data），可检查 PHP 进程用户；确认权限和所有者设置，必要时重启容器；若仍无法写入，检查 PHP 错误日志。最终解决了写入文件配置的问题，感叹学无止境。
---

# 前言
今天在部署基于PHP7.4的项目到Nas的时候报错提示修改配置失败，因为在开发环境的时候没有考虑到会有这个问题的具体原因，就随便写的判断，以至于后来只能在网上去一个一个找方案来解决，后来经过仔细排查后才发现是权限的问题。config.php 文件的权限为 -rwxr-xr-x，即文件的所有者具有读、写和执行权限，而组和其他用户只有读和执行权限，PHP进程可以成功写入该文件，就需要调整文件的权限和所有者。通常，PHP进程的用户是 www-data、apache 或 nginx。以下是具体解决问题的步骤。（因为这个问题找到了原因就很简单，所以就没有再复现了）
# 调整文件权限
由于文件当前的权限设置为 755（-rwxr-xr-x），应该将其更改为 664，以允许文件所有者和组用户进行读写操作，同时允许其他用户读取文件：
```language
chmod 664 /var/www/html/sys/libs/config.php
```
# 调整目录权限
确保目录 /var/www/html/sys/libs 具有适当的权限，使得 PHP 进程能够访问和写入该目录：
```language
chmod 775 /var/www/html/sys/libs
```
# 调整文件和目录的所有者
将文件和目录的所有者更改为 PHP 进程的用户，通常在 Docker 容器中是 www-data。如果容器中的用户不同，请相应调整：
```language
chown www-data:www-data /var/www/html/sys/libs/config.php
chown www-data:www-data /var/www/html/sys/libs
```
如果不确定容器中的 PHP 用户，可以使用以下命令检查 PHP 进程的用户：
```language
ps aux | grep php
```
确认更改
# 确保权限和所有者已正确设置：
```language
ls -l /var/www/html/sys/libs/config.php
ls -ld /var/www/html/sys/libs
```
重新启动容器（如果需要）
如果在配置更改后需要重新启动容器，可以使用：
```language
docker restart Web_MCCMS
```
检查 PHP 错误日志
如果权限和所有者设置正确，但仍然无法写入文件，请检查 PHP 错误日志。可以在容器内部查看日志文件，通常位于 /var/log/apache2/error.log：
```language
cat /var/log/apache2/error.log
```
# 结语
通过上面的操作就能完美的写入文件配置了，之前还没有注意过PHP还有权限这一说，学无止境啊

![image.png](https://img.onew.us.kg/file/11726295289262883.png)
![image.png](https://img.onew.us.kg/file/11726295324385844.png)