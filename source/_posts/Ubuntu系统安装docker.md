---
title: Ubuntu系统安装docker
date: 2024-11-16 13:30:31
updated: 2024-11-16 13:30:31
tags: 
    - 服务器
    - Ubuntu
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11731742346065662.jpg
comments: true
cover: https://img.onew.us.kg/file/onew11731742346065662.jpg
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
swiper_index: 2
top_group_index: 2
background: "#fff"
ai: 本文主要介绍了作者在华为云白嫖云服务器后，打算将运行在自家 NAS（仅有 IPv6 公网）上的博客迁移至此，因服务器使用 Ubuntu 系统且博客以 docker 安装方便迁移，遂记录 Ubuntu 下安装 docker 的步骤。涵盖卸载旧版本、更新软件包及依赖、安装 Docker GPG 密钥与 APT 源、安装 Docker、启动并启用服务、验证安装，还介绍了安装 docker - compose 及检查版本，最后提醒 Compose V2 命令格式变化。
---

# 前言
昨天在华为云白嫖了一个月的云服务器，想到了博客还运行在家里的nas上，只有IPv6的公网没有IPv4的公网，就想着把博客迁移过来。用的是Ubuntu系统，占用的内存比Windows server少多了，性能也比较好。然后博客是用docker安装的，方便迁移。下面就记录一下Ubuntu下安装docker的命令。
![Snipaste_20241116_132134.jpg](https://img.onew.us.kg/file/onew11731735063631643.jpg)
![Snipaste_20241116_132352.jpg](https://img.onew.us.kg/file/onew11731735075496547.jpg)
# 卸载旧版本 Docker（可选）
如果系统中安装了旧版本的 Docker，可以先卸载它们以避免冲突：
```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```
# 更新软件包和依赖
确保包管理器的索引是最新的：
```shell
sudo apt update
sudo apt upgrade
```
# 手动下载并安装 Docker GPG 密钥
```shell
wget https://download.docker.com/linux/ubuntu/gpg
```
导入密钥：
```shell
sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg gpg
```
# 手动添加 Docker APT源
手动添加 Docker 源，确保 /etc/apt/sources.list.d/ 目录存在，然后运行：
```shell
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
# 安装 Docker
更新包列表并安装 Docker：
```shell
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```
# 启动并启用 Docker 服务
安装完成后，启动 Docker 服务并设置开机自启：
```shell
sudo systemctl start docker
sudo systemctl enable docker
```
# 验证安装
运行以下命令检查 Docker 是否正确安装：
```shell
sudo docker --version
sudo docker-compose --version
```
# 安装docker-compose
最新版本的 docker-compose 已被整合到 Docker CLI 中，称为 Compose V2，可以通过 Docker 的官方工具安装。
## 安装 Compose V2 插件
运行以下命令来安装 Compose 插件：
```shell
sudo apt update
sudo apt install docker-compose-plugin
```
## 检查安装版本
```shell
docker compose version
```
# 安装完成
![Snipaste_20241116_153211.jpg](https://img.onew.us.kg/file/onew11731742346065662.jpg)
**注意：使用 Compose V2 时，命令改为 docker compose（用空格替代 -）。**