---
title: Docker常用命令汇总
date: 2024-09-18 20:11:11
updated: 2024-09-18 20:11:11
tags: 
    - Docker
    - 服务器
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11726799017300284.jpg
comments: true
cover: https://img.onew.us.kg/file/onew11726799017300284.jpg
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
ai: 本文主要介绍了作者因折腾 docker 时遇到不熟悉命令，为避免每次上网搜索而记录相关内容，记录了一些 Docker 常用命令。
---

# 前言
最近折腾了一阵docker，每次都有自己不熟悉的命令，就写下这篇文章记录一下，就不用每次都去网上搜了
# Docker常用命令
## Docker 服务相关命令
### 启动 Docker：
```shell
systemctl start docker
```
### 停止 Docker：
```shell
systemctl stop docker
```
### 重启 Docker：
```shell
systemctl restart docker
```
### 查看 Docker 运行状态：
```shell
systemctl status docker
```
## 镜像相关命令
### 列出本地镜像：
```shell
docker images
```
### 从 Docker Hub 拉取镜像：
```shell
docker pull <镜像名>:<标签>
```
示例：
```shell
docker pull nginx:latest
```
### 修改镜像名称：
```shell
docker tag <旧镜像名称或ID> <新镜像名称:标签>
```
### 删除本地镜像：
```shell
docker rmi <镜像ID或镜像名>
```
### 构建镜像：
```shell
docker build -t <镜像名>:<标签> <Dockerfile所在路径>
```
### 查看镜像的详细信息：
```shell
docker inspect <镜像ID或镜像名>
```
### 导出镜像文件（导出的是镜像，包括其历史记录和元数据，可以通过 docker load 重新加载）：
```shell
docker save -o [保存路径/文件名.tar] [镜像名]:[标签]
```
### 导入镜像文件
```shell
docker load -i [保存路径/文件名.tar] [镜像名]:[标签]
```
### 导出镜像文件（只导出容器的文件系统，没有镜像的历史记录和元数据，恢复时需要手动配置）：
```shell
docker export -o [保存路径/文件名.tar] [容器ID或容器名]
```
## 容器相关命令
### 运行容器：
```shell
docker run <选项> <镜像名>
```
常用选项：
-d：后台运行容器
-p：端口映射，例如 -p 8080:80 表示把本地主机的 8080 端口映射到容器的 80 端口
--name：为容器指定一个名称
-v：挂载目录，例如 -v /host/path:/container/path
-e：设置环境变量，例如 -e ENV_VAR=value
--rm：容器停止后自动删除
-it：以交互模式运行容器，通常用于运行命令行程序
### 列出运行中的容器：
```shell
docker ps
```
### 列出所有容器（包括停止的容器）：
```shell
docker ps -a
```
### 停止容器：
```shell
docker stop <容器ID或容器名>
```
### 启动已停止的容器：
```shell
docker start <容器ID或容器名>
```
### 重启容器：
```shell
docker restart <容器ID或容器名>
```
### 删除容器：
```shell
docker rm <容器ID或容器名>
```
### 查看容器日志：
```shell
docker logs <容器ID或容器名>
```
### 进入容器：
```shell
docker exec -it <容器ID或容器名> /bin/shell
```
或者使用：
```shell
docker attach <容器ID或容器名>
```
## 容器网络相关命令
### 查看容器网络：
```shell
docker network ls
```
### 创建自定义网络：
```shell
docker network create <网络名>
```
### 删除网络：
```shell
docker network rm <网络名>
```
### 连接容器到网络：
```shell
docker network connect <网络名> <容器ID或容器名>
```
### 从网络中断开容器：
```shell
docker network disconnect <网络名> <容器ID或容器名>
```
## 数据卷相关命令
### 创建数据卷：
```shell
docker volume create <卷名>
```
### 列出所有卷：
```shell
docker volume ls
```
### 删除数据卷：
```shell
docker volume rm <卷名>
```
### 查看卷的详细信息：
```shell
docker volume inspect <卷名>
```
## Docker Compose 常用命令
### 启动服务：
```shell
docker-compose up
```
### 使用 -d 参数在后台运行：
```shell
docker-compose up -d
```
### 停止服务：
```shell
docker-compose down
```
### 构建服务：
```shell
docker-compose build
```
### 重新启动服务（构建镜像后）：
```shell
docker-compose up --build
```
{% timeline 2024,blue %}
<!-- timeline 12-05 -->
docker镜像地址：https://one-w.us.kg
<!-- endtimeline -->
{% endtimeline %}
{% timeline 2025,blue %}
<!-- timeline 03-15 -->
docker镜像地址：https://docker.onew.us.kg/
<!-- endtimeline -->
{% endtimeline %}